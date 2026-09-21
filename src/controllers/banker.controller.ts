import { Request, Response } from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";
import { isUniqueViolation, parseId } from "../utils/helpers";
import logger from "../utils/logger";

export async function createBankerHandler(req: Request, res: Response) {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;
  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });
  try {
    await banker.save();
    return res.status(201).json({
      message: "Banker created successfully",
      banker: banker,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return res
        .status(409)
        .json({ error: "Email or card number is already used" });
    }
    logger.error(error, "Error creating banker");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function connectBankerToClientHandler(
  req: Request,
  res: Response
) {
  const clientId = parseId(req.params.clientId);
  const bankerId = parseId(req.params.bankerId);
  if (!clientId || !bankerId) {
    return res.status(400).json({ error: "Invalid banker or client id" });
  }
  try {
    const client = await Client.findOne({ where: { id: clientId } });
    const banker = await Banker.findOne({
      where: { id: bankerId },
      relations: { clients: true },
    });
    if (!banker || !client) {
      return res.status(404).json({ error: "banker or client not found" });
    }
    // add the client to the list, don't replace the clients the banker already has
    if (!banker.clients.some((c) => c.id === client.id)) {
      banker.clients.push(client);
      await banker.save();
    }
    return res.status(200).json({
      msg: "banker connected to client",
    });
  } catch (error) {
    logger.error(error, "Error connecting banker to client");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
