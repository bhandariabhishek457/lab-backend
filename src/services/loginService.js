import Users from "../models/UserModel.js";

export const createUser = async (email, password) => {
	return await Users.create({
		email: email,
		password: password,
	});
};

export const findAllUserByEmailID = async (email) => {
	return await Users.findAll({
		where: {
			email: email,
		},
	});
};

export const findUserByRefreshToken = async (refreshToken) => {
	return await Users.findOne({
		where: {
			refresh_token: refreshToken,
		},
	});
};

export const updateRefreshTokenForUserID = async (userId, refreshToken) => {
	return await Users.update(
		{ refresh_token: refreshToken },
		{
			where: {
				id: userId,
			},
			returning: true,
			plain: true,
		}
	);
};
