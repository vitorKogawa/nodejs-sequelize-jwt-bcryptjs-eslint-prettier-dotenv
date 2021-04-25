import { Router } from "express";
import UserController from "./controller/UserController";
import SessionController from "./controller/SessionController";
import authMiddleware from "./middleware/authenticate.middleware";

import multer from "multer";
import multerConfig from "./config/multer.config";
import FileController from "./controller/FileController";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.create);
routes.post("/login", SessionController.create);

routes.delete("/users", UserController.deleteAll);

routes.get("/users", UserController.findAll);

routes.use(authMiddleware);
routes.put("/users", UserController.update);
routes.post("/file", upload.single("file"), FileController.store);

export { routes };
