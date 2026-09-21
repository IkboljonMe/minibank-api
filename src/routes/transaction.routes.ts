import { Express } from "express";
import { createTransactionHandler } from "../controllers/transaction.controller";

function transactionRoutes(app: Express) {
  /**
   * @openapi
   * components:
   *   schemas:
   *     CreateTransactionInput:
   *       type: object
   *       required:
   *         - type
   *         - amount
   *       properties:
   *         type:
   *           type: string
   *           enum: [deposit, withdraw]
   *         amount:
   *           type: number
   *           description: Positive number, max 2 decimal places
   *           default: 50
   */
  /**
   * @openapi
   * /api/client/{clientId}/transaction:
   *   post:
   *     tags:
   *       - Create a transaction
   *     summary: Create a new transaction for a client
   *     parameters:
   *       - in: path
   *         name: clientId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the client for whom the transaction is being created
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTransactionInput'
   *     responses:
   *       '201':
   *         description: Transaction created successfully
   *         content:
   *           application/json:
   *             example:
   *               message: Transaction created successfully
   *               client:
   *                 id: 1
   *                 first_name: clienttest
   *                 last_name: clienttest
   *                 email: clienttest@gmail.com
   *                 card_number: "12121212"
   *                 balance: 10050
   *               transaction:
   *                 id: 1
   *                 type: deposit
   *                 amount: 50
   *       '400':
   *         description: Invalid type or amount, or not enough money for a withdraw
   *         content:
   *           application/json:
   *             example:
   *               error: Insufficient funds
   *       '404':
   *         description: Not found
   *         content:
   *           application/json:
   *             example:
   *               error: Client not found
   */
  app.post("/api/client/:clientId/transaction", createTransactionHandler);
}
export default transactionRoutes;
