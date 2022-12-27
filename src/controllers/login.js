import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";
import * as loginService from "../services/loginService.js";

export const Register = async (req, res) => {
	const { email, password, confPassword } = req.body;
	if (password !== confPassword)
		return res
			.status(400)
			.json({ msg: "Password and Confirm Password do not match" });
	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		const userEmailCheck = await loginService.findAllUserByEmailID(email);

		if (userEmailCheck[0]?.email == email) {
			return res
				.status(400)
				.json({ msg: "User already exist with email id " + email });
		}

		const user = await loginService.createUser(email, hashPassword);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
};

export const Login = async (req, res) => {
	try {
		const user = await loginService.findAllUserByEmailID(req.body.email);

		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (!match) return res.status(400).json({ msg: "Wrong Password" });
		const userId = user[0].id;
		const email = user[0].email;
		const accessToken = jwt.sign(
			{ userId, email },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);
		const refreshToken = jwt.sign(
			{ userId, email },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);

		await loginService.updateRefreshTokenForUserID(userId, refreshToken);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken, refreshToken });
	} catch (error) {
		res.status(404).json({ msg: "Email not found" });
	}
};

export const Logout = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.sendStatus(204);
	const user = await loginService.findUserByRefreshToken(refreshToken);
	if (!user) return res.sendStatus(204);
	const userId = user.id;
	await Users.update(
		{ refresh_token: null },
		{
			where: {
				id: userId,
			},
		}
	);
	res.clearCookie("refreshToken");
	return res.sendStatus(200);
};
