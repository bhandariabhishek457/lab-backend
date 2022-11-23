export const validateVaccineData = (req, res, next) => {
	const { name, description, noOfDoges } = req.body;

	const errors = {};

	if (!name) {
		errors.name = "name is required";
	}
	if (!description) {
		errors.description = "description is required";
	}

	if (!noOfDoges) {
		errors.noOfDoges = "noOfDoges is required";
	}

	if (Object.keys(errors).length > 0) {
		return res.status(400).send(errors);
	}
	next();
};
