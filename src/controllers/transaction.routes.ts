import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionType } from "../entities/Transaction";

export async function createTransactionHanler(req: Request, res: Response) {
  const { clientId } = req.params;
  const { type, amount } = req.body;
  console.log(clientId, type, amount);
  const client = await Client.findOne({ where: { id: parseInt(clientId) } });
  if (!client) {
    return res.sendStatus(404);
  }
  console.log(client, "Client");
  const transaction = await Transaction.create({
    amount,
    client,
    type,
  });
  if (!transaction) {
    return res.sendStatus(404);
  }
  await transaction.save();
  if (type === TransactionType.DEPOSIT) {
    client.balance = client.balance + parseInt(amount);
    console.log(client.balance, "HERERERER");
    client.transactions = [transaction];
  } else if (type === TransactionType.WITHDRAW) {
    client.balance = client.balance - parseInt(amount);
    console.log(client.balance, "HERERERER");
    client.transactions = [transaction];
  }
  await client.save();
  return res.json(client);
}
