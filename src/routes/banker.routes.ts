import { Express } from "express";
import {
  connectBankerToClientHandler,
  createBankerHandler,
} from "../controllers/banker.controller";
import checkRequestBody from "../middlewares/checkRequestBody";

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
   *         description: Succes
   *       '404':
   *         description: Not found
   *       '500':
   *         description: Not found
   *         content:
   *           application/json:
   *             example:
   *               error: Internal Server Error
   */

  app.post("/api/banker", checkRequestBody, createBankerHandler);
  /**
   * @openapi
   * /api/banker/{bankerId}/client/{clientId}:
   *   put:
   *     tags:
   *       - Connect Banker to Client
   *     summary: Connect Banker to Client
   *     parameters:
   *       - in: path
   *         name: bankerId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the banker
   *       - in: path
   *         name: clientId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the client
   *     responses:
   *       '200':
   *         description: Success
   *         content:
   *           application/json:
   *             example:
   *               msg: Success
   *       '404':
   *         description: Not found
   *         content:
   *           application/json:
   *             example:
   *               error: Not found
   */
  app.put(
    "/api/banker/:bankerId/client/:clientId",
    connectBankerToClientHandler
  );
}
export default bankerRoutes;
