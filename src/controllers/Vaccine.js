import * as vaccineService from "../services/vaccineService.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const getAllVaccine = async (req, res) => {
	try {
		const vaccine = await vaccineService.getVaccines();
		res.json(vaccine);
	} catch (error) {
		res.json({ message: error.message });
	}
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const getVaccineById = async (ids) => {
	try {
		const vaccine = await vaccineService.getVaccineById(ids);
		return vaccine[0];
	} catch (error) {
		res.json({ message: error.message });
	}
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const createVaccine = async (req, res) => {
	try {
		const vaccine = await vaccineService.createVaccine(req);
		return res.status(200).json(vaccine);
	} catch (error) {
		res.json({ message: error.message });
	}
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const updateVaccine = async (req, res) => {
	try {
		const updatedVaccine = await vaccineService.updateVaccine(req);

		return res.status(200).json(updatedVaccine);
	} catch (error) {
		res.json({ message: error.message });
	}
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const deleteVaccine = async (req, res) => {
	try {
		const deletedVaccine = await vaccineService.deleteVaccine(req);

		return res
			.status(200)
			.json({ message: "Vaccine Deleted", deletedRows: deletedVaccine });
	} catch (error) {
		res.json({ message: error.message });
	}
};
