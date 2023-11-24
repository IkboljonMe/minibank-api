import { Request, Response } from "express";
import { Banker } from "../entities/Banker";
import { PostgresData } from "../utils/database";

export async function createBankerHandler(req: Request, res: Response) {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;
  const banker = await PostgresData.createQueryBuilder()
    .insert()
    .into(Banker)
    .values({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      employee_number: employeeNumber,
    })
    .execute();
  console.log(banker, "BANKER");
  if (!banker) {
    return res.sendStatus(404);
  }
  return res.json(banker);
}
