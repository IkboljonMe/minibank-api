import { Express } from "express";
import { createClientHandler } from "../controllers/client.controller";
function clientRoutes(app: Express) {
  app.post("/api/client", createClientHandler);
}
export default clientRoutes;
