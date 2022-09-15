import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/auth";

const routes = Router();

routes.post("/signup", new UserController().create);
routes.post('/login', new UserController().login)

routes.get('/profile', authMiddleware, new UserController().getProfile)

export default routes;
