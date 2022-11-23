import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
	process.env.DB,
	process.env.USR_NAME,
	process.env.PASSWORD,
	{
		host: process.env.HOST,
		dialect: process.env.DIALECT,
		logging: false,
	}
);
db.sync()
	.then((data) => {})
	.catch((e) => console.log(e, "err"));

export default db;
