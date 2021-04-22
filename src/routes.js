import { Router } from "express";
import UserController from "./controller/UserController.controller";
import SessionController from "./controller/SessionController.controller";
import authMiddleware from "./middleware/authenticate.middleware";

const routes = Router();
routes.post("/users", UserController.create);
routes.post("/login", SessionController.create);

routes.use(authMiddleware);
routes.put("/users", UserController.update);

export { routes };
