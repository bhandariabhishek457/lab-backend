import express from "express";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Register, Login, Logout } from "../controllers/login.js";

const loginRouter = express.Router();

loginRouter.post("/users", Register);
loginRouter.post("/login", Login);
loginRouter.get("/token", refreshToken);
loginRouter.delete("/logout", Logout);

export default loginRouter;
