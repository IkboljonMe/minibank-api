import { DataSource } from "typeorm";
import logger from "./logger";

export default async function database() {
  try {
    const postgres = await new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "mac",
      password: "1221qwwq",
      database: "mac",
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
