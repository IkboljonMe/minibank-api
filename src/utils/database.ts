import { DataSource } from "typeorm";
import logger from "./logger";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";
import { Transaction } from "../entities/Transaction";

export default async function database() {
  try {
    const postgres = await new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1221qwwq",
      database: "postgres",
      synchronize: true,
      entities: [Client, Banker, Transaction],
    });
    postgres
      .initialize()
      .then(() => logger.info("Db connected on 5432 port"))
      .catch((error) =>
        logger.error(error, "Erro while intializing DataSource")
      );
  } catch (error) {
    logger.error(error, "Error has occured while connecting database");
  }
}
