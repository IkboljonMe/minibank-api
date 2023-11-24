import { Express } from "express";
import {
  createClientHandler,
  deleteClientHandler,
} from "../controllers/client.controller";
function clientRoutes(app: Express) {
  app.post("/api/client", createClientHandler);
  app.delete("/api/client/:clientId", deleteClientHandler);
}
export default clientRoutes;
