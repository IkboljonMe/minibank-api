import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { PostgresData } from "../utils/database";

export async function createClientHandler(req: Request, res: Response) {
  const { firstName, lastName, email, cardNumber, balance } = req.body;
  const client = await PostgresData.createQueryBuilder()
    .insert()
    .into(Client)
    .values({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    })
    .execute();
  if (!client) {
    return res.sendStatus(404);
  }
  return res.json(client);
}
export async function deleteClientHandler(req: Request, res: Response) {
  const { clientId } = req.params;

  const response = await Client.delete(clientId);

  return res.json(response);
}
