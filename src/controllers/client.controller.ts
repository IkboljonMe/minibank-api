import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { PostgresData } from "../utils/database";

export async function createClientHandler(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, cardNumber, balance } = req.body;

    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });

    await client.save();

    return res.status(200).json({
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteClientHandler(req: Request, res: Response) {
  const { clientId } = req.params;
  try {
    await Client.delete(clientId);
    return res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
