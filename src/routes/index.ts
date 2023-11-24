import { Express } from "express";
import clientRoutes from "./client.routes";
import bankerRoutes from "./banker.routes";

function routes(app: Express) {
  clientRoutes(app);
  bankerRoutes(app);
}
export default routes;
