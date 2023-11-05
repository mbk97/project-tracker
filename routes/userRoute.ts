import { Router } from "express";
import { login, registerUser } from "../controller/userController";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);

export { userRouter };
