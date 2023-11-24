import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { PostgresData } from "../utils/database";

export async function createClientHandler(req: Request, res: Response) {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  try {
    const result = await PostgresData.createQueryBuilder()
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

    const createdClient = result.generatedMaps[0] as Client;

    return res.status(200).json({
      message: "Client created successfully",
      client: createdClient,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteClientHandler(req: Request, res: Response) {
  const { clientId } = req.params;

  try {
    const deleteResult = await Client.delete(clientId);

    if (deleteResult.affected === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    return res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
