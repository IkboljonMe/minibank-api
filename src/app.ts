import express from "express";
import logger from "./utils/logger";
import database from "./utils/database";
import routes from "./routes";

const app = express();
app.use(express.json());

app.listen(1337, async () => {
  await database();
  routes(app);
  logger.info("Server running on http://localhost:1337");
});
