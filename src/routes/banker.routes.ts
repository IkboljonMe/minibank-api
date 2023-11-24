import { Express } from "express";
import {
  connectBankerToClientHandler,
  createBankerHandler,
} from "../controllers/banker.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBankerInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - cardNumber
 *         - employeeNumber
 *       properties:
 *         firstName:
 *           type: string
 *           default: bankertest
 *         lastName:
 *           type: string
 *           default: bankertest
 *         email:
 *           type: string
 *           default: bankertest@gmail.com
 *         cardNumber:
 *           type: string
 *           default: 1111111223
 *         employeeNumber:
 *           type: string
 *           default: 1
 */
function bankerRoutes(app: Express) {
  /**
   * @openapi
   * /api/banker:
   *   post:
   *     tags:
   *       - Create a banker
   *     summary: Create a new banker
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBankerInput'
   *     responses:
   *       '200':
   *         description: Banker created successfully
   *         content:
   *           application/json:
   *             example:
   *               message: Banker created successfully
   *       '404':
   *         description: Not found
   */

  app.post("/api/banker", createBankerHandler);
  app.put(
    "/api/banker/:bankerId/client/:clientId",
    connectBankerToClientHandler
  );
}
export default bankerRoutes;
