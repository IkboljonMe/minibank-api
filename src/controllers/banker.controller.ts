import { Request, Response } from "express";
import { Banker } from "../entities/Banker";
import { PostgresData } from "../utils/database";
import { Client } from "../entities/Client";

export async function createBankerHandler(req: Request, res: Response) {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();

  return res.json(banker);
}
export async function connectBankerToClientHandler(
  req: Request,
  res: Response
) {
  const { clientId, bankerId } = req.params;
  const client = await Client.findOne({ where: { id: parseInt(clientId) } });
  const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });
  if (banker && client) {
    banker.clients = [client];
    await banker.save();
    return res.json({
      msg: "banker connected to client",
    });
  } else {
    return res.json({
      msg: "banker or client not found",
    });
  }
}
