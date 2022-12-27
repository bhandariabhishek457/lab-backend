import Vaccine from "../models/VaccineModel.js";
import cloudinary from "../utils/cloudinary.js";

export const getVaccines = (props) => {
	return Vaccine.findAll({
		order: [["mandatory", "DESC"]],
	});
};

export const getVaccineById = (props) => {
	return Vaccine.findAll({
		where: {
			id: props,
		},
	});
};

export const createVaccine = async (props) => {
	const { image } = props.body;

	if (image) {
		const uploadRes = await cloudinary.uploader.upload(image, {
			upload_preset: "vaccine",
		});
		if (uploadRes) {
			props.body.image = uploadRes.url;
		}
	}

	const newVaccine = await Vaccine.create(props.body);

	return newVaccine;
};

export const updateVaccine = async (props) => {
	const vaccine = await getVaccineById(props.params.id);

	if (vaccine.image) {
		if (vaccine.image !== props.body.image) {
			const uploadRes = await cloudinary.uploader.upload(image, {
				upload_preset: "vaccine",
			});
			if (uploadRes) {
				props.body.image = uploadRes.url;
			}
		} else {
		}
	}

	const updatedVaccine = await Vaccine.update(props.body, {
		where: {
			id: props.params.id,
		},
		returning: true,
		plain: true,
	});

	return updatedVaccine[1].dataValues;
};

export const deleteVaccine = async (props) => {
	const vaccineDestroyed = await Vaccine.destroy({
		where: {
			id: props.params.id,
		},
	});

	return vaccineDestroyed;
};
