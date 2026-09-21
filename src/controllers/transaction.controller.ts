import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionType } from "../entities/Transaction";
import { MAX_MONEY, fromCents, isValidAmount, toCents } from "../entities/helpers/money";
import { PostgresData } from "../utils/database";
import { parseId } from "../utils/helpers";
import logger from "../utils/logger";

class TransactionError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function createTransactionHandler(req: Request, res: Response) {
  const clientId = parseId(req.params.clientId);
  const { type, amount } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: "Invalid client id" });
  }
  if (!Object.values(TransactionType).includes(type)) {
    return res
      .status(400)
      .json({ error: "type must be 'deposit' or 'withdraw'" });
  }
  if (!isValidAmount(amount)) {
    return res.status(400).json({
      error: "amount must be a positive number with max 2 decimal places",
    });
  }

  try {
    // Everything runs in one db transaction. The client row is locked
    // (SELECT ... FOR UPDATE) so two requests can't change the balance at the same time.
    const result = await PostgresData.transaction(async (manager) => {
      const client = await manager.findOne(Client, {
        where: { id: clientId },
        lock: { mode: "pessimistic_write" },
      });

      if (!client) {
        throw new TransactionError(404, "Client not found");
      }

      let balanceCents = toCents(client.balance);
      if (type === TransactionType.DEPOSIT) {
        balanceCents += toCents(amount);
        if (balanceCents > toCents(MAX_MONEY)) {
          throw new TransactionError(400, "Balance limit reached");
        }
      } else {
        if (toCents(amount) > balanceCents) {
          throw new TransactionError(400, "Insufficient funds");
        }
        balanceCents -= toCents(amount);
      }
      client.balance = fromCents(balanceCents);
      await manager.save(client);

      const transaction = manager.create(Transaction, {
        amount,
        client,
        type,
      });
      await manager.save(transaction);

      return { client, transaction };
    });

    const { client, transaction } = result;
    return res.status(201).json({
      message: "Transaction created successfully",
      client,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        created_at: transaction.created_at,
      },
    });
  } catch (error) {
    if (error instanceof TransactionError) {
      return res.status(error.status).json({ error: error.message });
    }
    logger.error(error, "Error creating transaction");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
