import { Express } from "express";
import clientRoutes from "./client.routes";

function routes(app: Express) {
  clientRoutes(app);
}
export default routes;
