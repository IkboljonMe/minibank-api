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
   *           enum: [DEPOSIT, WITHDRAW]
   *         amount:
   *           type: number
   *           default: 0
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
   *       '200':
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
   *                 card_number: null
   *                 balance: 100  # Updated balance based on the transaction
   *                 transactions:   # Updated transactions array
   *                   - id: 1
   *                     amount: 50
   *                     type: deposit
   *                     client_id: 1
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
