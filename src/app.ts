import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import logger from "./utils/logger";
import database from "./utils/database";
import routes from "./routes";
import swaggerDocs from "./utils/swagger";

const app = express();
app.use(express.json());

async function start() {
  await database();
  routes(app);
  swaggerDocs(app, process.env.SERVER_PORT);
  // return JSON instead of an HTML stack trace for broken request bodies
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
    logger.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  });
  app.listen(process.env.SERVER_PORT, () => {
    logger.info(
      `Server running on http://localhost:${process.env.SERVER_PORT}`
    );
  });
}

start().catch((error) => {
  logger.error(error, "Could not start the server");
  process.exit(1);
});
