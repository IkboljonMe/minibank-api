import { Express } from "express";
import { createBankerHandler } from "../controllers/banker.controller";
function bankerRoutes(app: Express) {
  app.post("/api/banker", createBankerHandler);
}
export default bankerRoutes;
