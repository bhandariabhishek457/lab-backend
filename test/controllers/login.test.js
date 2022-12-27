import { expect } from "chai";
import request from "supertest";

import dotenv from "dotenv";

import app from "../../index.js";

const url = "";

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
	let refreshToken = "";
	it("should create new user", async () => {
		const res = await request(app).post(`${url}/users`).send(userData);
		expect(res.body).to.be.an("object");
	});

	it("should sign in user", async () => {
		const res = await request(app).post(`${url}/login`).send(userData);

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("object");
		expect(res.body.accessToken).to.be.an("string");
		refreshToken = res.body.refreshToken;
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
			.set("Cookie", [`refreshToken=${invalidRefreshTOken}`])
			.send({});
		expect(res.status).to.equal(403);
	});

	it("should return 200 if refresh token is found ", async () => {
		const res = await request(app)
			.get(`${url}/token`)
			.set("Cookie", [`refreshToken=${refreshToken}`])
			.send({});
		expect(res.status).to.equal(200);
	});

	it("should log out the system ", async () => {
		const res = await request(app)
			.delete(`${url}/logout`)
			.set("Cookie", [`refreshToken=${refreshToken}`])
			.send({});
		expect(res.status).to.equal(200);
	});
});
