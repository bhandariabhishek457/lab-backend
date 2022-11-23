import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
	"users",
	{
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		refresh_token: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: "Users",
	}
);

export default Users;
