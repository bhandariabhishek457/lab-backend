import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Vaccines = db.define(
	"Vaccines",
	{
		name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		noOfDoges: {
			type: DataTypes.INTEGER,
		},
		mandatory: {
			type: DataTypes.BOOLEAN,
		},
		image: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: "Vaccines",
	}
);

export default Vaccines;
