import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

app.use(router);

const port = process.env.port || 5000;

app.listen(port, () => console.log("Server running at port " + port));

export default app;
