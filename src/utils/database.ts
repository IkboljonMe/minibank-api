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
  // creates tables from the entities, don't use this on a real production db
  synchronize: process.env.NODE_ENV !== "production",
  entities: [Client, Banker, Transaction],
});

export default async function database() {
  await PostgresData.initialize();
  logger.info(`PostgreSQL is running on port number => ${process.env.PG_PORT}`);
}
