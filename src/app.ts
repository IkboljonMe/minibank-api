import express from "express";
import logger from "./utils/logger";
import database from "./utils/database";

const app = express();

app.listen(1337, async () => {
  await database();
  logger.info("Server running on http://localhost:1337");
});
