import { expect } from "chai";
import request from "supertest";

import dotenv from "dotenv";

import app from "../../index.js";

const url = "";

const token = process.env.TEST_TOKEN;

const validRefreshToken = process.env.REFRESH_TOKEN_SECRET;

const invalidRefreshTOken = "sadfasdfw342423fsdf";

const userData = {
	email: "vvv@gmail.com",
	password: "test123",
	confPassword: "test123",
};

/**
 * Tests for register and login'.
 */
describe("Auth Test", () => {
	const refreshToken = "";
	it("should create new user", async () => {
		const res = await request(app).post(`${url}/users`).send(userData);
		expect(res.body).to.be.an("object");
	});

	it("should sign in user", async () => {
		const res = await request(app).post(`${url}/login`).send(userData);

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("object");
		expect(res.body.accessToken).to.be.an("string");
	});

	it("should not sign in user with wrong password", async () => {
		const res = await request(app).post(`${url}/login`).send({
			email: "test@gmail.com",
			password: "test12345",
		});

		expect(res.body.msg).to.equal("Wrong Password");
	});

	it("should refresh a token not found", async () => {
		const res = await request(app).get(`${url}/token`).send({});
		expect(res.status).to.equal(401);
	});

	it("should return 403 if refresh token not found ", async () => {
		const res = await request(app)
			.get(`${url}/token`)
			.set("Cookie", ["refreshToken=${invalidRefreshTOken}"])
			.send({});
		expect(res.status).to.equal(403);
	});
});
