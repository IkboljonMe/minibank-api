import { Express } from "express";
import {
  connectBankerToClientHandler,
  createBankerHandler,
} from "../controllers/banker.controller";
function bankerRoutes(app: Express) {
  app.post("/api/banker", createBankerHandler);
  app.put(
    "/api/banker/:bankerId/client/:clientId",
    connectBankerToClientHandler
  );
}
export default bankerRoutes;
