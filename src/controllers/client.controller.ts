import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { isValidAmount } from "../entities/helpers/money";
import { isUniqueViolation, parseId } from "../utils/helpers";
import logger from "../utils/logger";

export async function createClientHandler(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, cardNumber } = req.body;
    // balance is optional, a new client starts with 0
    const balance = req.body.balance === undefined ? 0 : req.body.balance;

    if (balance !== 0 && !isValidAmount(balance)) {
      return res.status(400).json({
        error: "balance must be a number >= 0 with max 2 decimal places",
      });
    }

    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });

    await client.save();

    return res.status(201).json({
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return res
        .status(409)
        .json({ error: "Email or card number is already used" });
    }
    logger.error(error, "Error creating client");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteClientHandler(req: Request, res: Response) {
  const clientId = parseId(req.params.clientId);
  if (!clientId) {
    return res.status(400).json({ error: "Invalid client id" });
  }
  try {
    const result = await Client.delete(clientId);
    if (!result.affected) {
      return res.status(404).json({ error: "Client not found" });
    }
    return res.status(200).json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    logger.error(error, "Error deleting client");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
