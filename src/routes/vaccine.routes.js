import express from "express";
import {
	getAllVaccine,
	createVaccine,
	getVaccineById,
	updateVaccine,
	deleteVaccine,
} from "../controllers/Vaccine.js";
import { validateVaccineData } from "../middlewares/validateVaccineData.js";

const vaccineRouter = express.Router();

vaccineRouter.get("/", getAllVaccine);
vaccineRouter.get("/:id", getVaccineById);
vaccineRouter.post("/", validateVaccineData, createVaccine);
vaccineRouter.patch("/:id", validateVaccineData, updateVaccine);
vaccineRouter.delete("/:id", deleteVaccine);

export default vaccineRouter;
