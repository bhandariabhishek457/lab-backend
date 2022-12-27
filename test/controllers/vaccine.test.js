import { expect } from "chai";
import request from "supertest";

import dotenv from "dotenv";

import app from "../../index.js";

import * as vaccineController from "../../src/controllers/Vaccine.js";

const url = "/vaccines/";

const token = process.env.TEST_TOKEN;
const invalidToken = "sdfasdfasdf";

const vaccineData = {
	name: "Vaccine 1",
	description: "Vaccine 1 desc",
	noOfDoges: 2,
	mandatory: true,
};

const updateData = {
	name: "Vaccine 1",
	description: "Vaccine 1 desc",
	noOfDoges: 1,
	mandatory: true,
};

describe("Vaccine API Test", () => {
	var vaccineId = "";
	it("should return 403 for invalid token", async () => {
		const res = await request(app)
			.post(`${url}`)
			.set("Authorization", `Bearer ${invalidToken}`)
			.send(vaccineData);

		expect(res.status).to.equal(403);
	});

	it("should return 403 for if ther is no token", async () => {
		const res = await request(app).post(`${url}`).send(vaccineData);

		expect(res.status).to.equal(401);
	});

	it("should create new vaccine", async () => {
		const res = await request(app)
			.post(`${url}`)
			.set("Authorization", `Bearer ${token}`)
			.send(vaccineData);

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("object");
		expect(res.body.name).to.be.an("string");
		expect(res.body.mandatory).to.be.an("boolean");
		vaccineId = res.body.id;
	});

	it("should get vaccine", async () => {
		const res = await vaccineController.getVaccineById(vaccineId);

		expect(res.name).to.be.an("string");
		expect(res.mandatory).to.be.an("boolean");
	});

	it("should not create new vaccine with invalid data", async () => {
		const res = await request(app)
			.post(`${url}`)
			.set("Authorization", `Bearer ${token}`)
			.send("");

		expect(res.status).to.equal(400);
	});

	it("should get all vaccines", async () => {
		const res = await request(app)
			.get(`${url}`)
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("array");
	});

	it("should update vaccine", async () => {
		const res = await request(app)
			.patch(`${url}/${vaccineId}`)
			.set("Authorization", `Bearer ${token}`)
			.send(updateData);

		expect(res.status).to.equal(200);
		expect(res.body).to.be.an("object");
		expect(res.body.name).to.be.an("string");
		expect(res.body.mandatory).to.be.an("boolean");
	});

	it("should delete vaccine", async () => {
		const res = await request(app)
			.delete(`${url}/${vaccineId}`)
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).to.equal(200);
		expect(res.body.deletedRows).to.equal(1);
	});
});
