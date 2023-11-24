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

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateClientInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - cardNumber
 *         - balance
 *       properties:
 *         firstName:
 *           type: string
 *           default: clienttest
 *         lastName:
 *           type: string
 *           default: clienttest
 *         email:
 *           type: string
 *           default: clienttest@gmail.com
 *         cardNumber:
 *           type: string
 *           default: 12121212
 *         balance:
 *           type: number
 *           default: 10000
 */
/**
 * @openapi
 * /api/client:
 *   post:
 *     tags:
 *       - Create a client
 *     summary: Create a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientInput'
 *     responses:
 *       '200':
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Client created successfully
 *               client:
 *                 id: 1
 *                 first_name: clienttest
 *                 last_name: clienttest
 *                 email: clienttest@gmail.com
 *                 card_number: null
 *                 balance: null
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @openapi
 * /api/client/{clientId}:
 *   delete:
 *     tags:
 *       - Delete a client
 *     summary: Delete a client by ID
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the client to delete
 *     responses:
 *       '200':
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Client deleted successfully
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             example:
 *               error: Client not found
 */
