import { Express } from "express";
import clientRoutes from "./client.routes";
import bankerRoutes from "./banker.routes";
import transactionRoutes from "./transaction.routes";

function routes(app: Express) {
  clientRoutes(app);
  bankerRoutes(app);
  transactionRoutes(app);
}
export default routes;
