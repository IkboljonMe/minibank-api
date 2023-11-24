import { DataSource } from "typeorm";
import logger from "./logger";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";
import { Transaction } from "../entities/Transaction";
export const PostgresData: DataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  entities: [Client, Banker, Transaction],
});

export default async function database() {
  PostgresData.initialize()
    .then(() => {
      logger.info(
        `PostgreSQL is runnig on port number => ${process.env.PG_PORT}`
      );
    })
    .catch((error) =>
      logger.error(error, "Error while intializing DataSource")
    );
}
