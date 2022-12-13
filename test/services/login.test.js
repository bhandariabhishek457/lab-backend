import { expect } from "chai";
import * as userService from "../../src/services/loginService.js";

const userData = {
	email: "test@gmail.com",
	password: "test123",
	confPassword: "test123",
};

const refreshToken = "sdfasdfadfaken2383fnbsdf";

/**
 * login service test'.
 */
describe("Auth Test", () => {
	var userId = "";
	it("should create new user", async () => {
		const user = await userService.createUser(
			userData.email,
			userData.password
		);

		expect(user.email).to.equal(userData.email);
		expect(user.password).to.equal(userData.password);
		userId = user.id;
	});

	it("should find a user with email id", async () => {
		const user = await userService.findAllUserByEmailID(userData.email);
		expect(user[0].email).to.equal(userData.email);
	});

	it("update refresh token for user ", async () => {
		const user = await userService.updateRefreshTokenForUserID(
			userId,
			refreshToken
		);
		expect(user[1].dataValues.refresh_token).to.equal(refreshToken);
	});

	it("find user by refresh token ", async () => {
		const user = await userService.findUserByRefreshToken(refreshToken);

		expect(user.refresh_token).to.equal(refreshToken);
	});
});
