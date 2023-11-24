import { DataSource } from "typeorm";
import logger from "./logger";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";
import { Transaction } from "../entities/Transaction";
export const PostgresData: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1221qwwq",
  database: "postgres",
  synchronize: true,
  entities: [Client, Banker, Transaction],
});

export default async function database() {
  PostgresData.initialize()
    .then(() => {
      logger.info("Db connected on 5432 port");
    })
    .catch((error) =>
      logger.error(error, "Error while intializing DataSource")
    );
}
