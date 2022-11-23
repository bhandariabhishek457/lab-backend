import express from "express";
import loginRouter from "./login.routes.js";
import vaccineRouter from "./vaccine.routes.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.use("/", loginRouter);

router.use("/vaccines", verifyToken, vaccineRouter);

export default router;
