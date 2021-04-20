import { Router } from "express";
import UserController from "./controller/UserController.controller";
import SessionController from "./controller/SessionController.controller";
const routes = Router();

routes.post("/", UserController.create);
routes.post("/login", SessionController.create);                

export { routes };
