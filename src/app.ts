import express from "express";
import logger from "./utils/logger";
import database from "./utils/database";
import routes from "./routes";
import swaggerDocs from "./utils/swagger";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.listen(process.env.SERVER_PORT, async () => {
  await database();
  routes(app);
  logger.info(`Server running on http://localhost:${process.env.SERVER_PORT}`);
  swaggerDocs(app, process.env.SERVER_PORT);
});
