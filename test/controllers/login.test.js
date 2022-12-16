import { expect } from "chai";
import request from "supertest";

import dotenv from "dotenv";

import app from "../../index.js";

const url = "";

const token = process.env.TEST_TOKEN;

const userData = {
	email: "tet@gmail.com",
	password: "test123",
	confPassword: "test123",
};

/**
 * Tests for register and login'.
 */
describe("Auth Test", () => {
	// it("should create new user", async () => {
	// 	const res = await request(app).post(`${url}/users`).send(userData);

	// 	expect(res.status).to.equal(200);
	// 	expect(res.body).to.be.an("object");
	// 	expect(res.body.email).to.be.an("string");
	// });

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
});
