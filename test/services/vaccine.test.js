import * as vaccineService from "../../src/services/vaccineService.js";
import { expect } from "chai";

const vaccineData = {
	body: {
		name: "Vaccine 1",
		description: "Vaccine 1 desc",
		noOfDoges: 2,
		mandatory: true,
	},
};

const vaccineDataUpdate = {
	body: {
		name: "Vaccine 1 updated",
		description: "Vaccine 1 desc updated",
		noOfDoges: 3,
		mandatory: false,
	},
	params: {
		id: "",
	},
};

describe("Testing vaccine Unit test", () => {
	var vaccineId = "";
	it("create vaccine ", async () => {
		const vaccine = await vaccineService.createVaccine(vaccineData);

		expect(vaccine.name).equal("Vaccine 1");
		expect(vaccine.description).equal("Vaccine 1 desc");
		expect(vaccine.noOfDoges).equal(2);
		expect(vaccine.mandatory).equal(true);

		vaccineId = vaccine.id;
	});

	it("update vaccine ", async () => {
		vaccineDataUpdate.params.id = vaccineId;
		const vaccine = await vaccineService.updateVaccine(vaccineDataUpdate);

		expect(vaccine.name).equal("Vaccine 1 updated");
		expect(vaccine.description).equal("Vaccine 1 desc updated");
		expect(vaccine.noOfDoges).equal(3);
		expect(vaccine.mandatory).equal(false);
	});

	it("get all vaccine ", async () => {
		const vaccine = await vaccineService.getVaccines();
		expect(vaccine).to.be.an("array");
	});

	it("should delete vaccine", async () => {
		const deletedRows = await vaccineService.deleteVaccine(vaccineDataUpdate);
		expect(deletedRows).to.equal(1);
	});
});
