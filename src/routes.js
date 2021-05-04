import { Router } from "express";
import UserController from "./controller/UserController";
import SessionController from "./controller/SessionController";
import authMiddleware from "./middleware/authenticate.middleware";

import multer from "multer";
import multerConfig from "./config/multer.config";
import FileController from "./controller/FileController";
import ProviderController from "./controller/ProviderController";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/login", SessionController.create);
routes.post("/users", UserController.create);
routes.get("/users", UserController.findAll);

// routes.use(authMiddleware);
routes.put("/users", UserController.update);
routes.put("/user/disable", UserController.disableAll);
routes.put("/user/disable/:id", UserController.disableByPk);
routes.get("/provider", ProviderController.index);
routes.post("/file", upload.single("file"), FileController.store);

export { routes };