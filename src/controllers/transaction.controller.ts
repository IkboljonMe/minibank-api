import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionType } from "../entities/Transaction";

export async function createTransactionHandler(req: Request, res: Response) {
  const { clientId } = req.params;
  const { type, amount } = req.body;

  try {
    const client = await Client.findOne({ where: { id: parseInt(clientId) } });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const transaction = Transaction.create({
      amount,
      client,
      type,
    });
    transaction.save();

    if (type === TransactionType.DEPOSIT) {
      client.balance = client.balance + parseInt(amount);
      client.transactions = [transaction];
    } else if (type === TransactionType.WITHDRAW) {
      client.balance = client.balance - parseInt(amount);
      client.transactions = [transaction];
    }

    await client.save();

    return res.status(200).json({
      message: "Transaction created successfully",
      client,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
