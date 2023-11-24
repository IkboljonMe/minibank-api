import { Express } from "express";
import { createTransactionHanler } from "../controllers/transaction.routes";
function transactionRoutes(app: Express) {
  app.post("/api/client/:clientId/transaction", createTransactionHanler);
}
export default transactionRoutes;
