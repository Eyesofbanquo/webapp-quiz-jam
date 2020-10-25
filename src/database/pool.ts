import { Pool } from "pg";
import { CATEGORY_TABLE } from "../api/category/routes";
import { createQuestionTable, QUESTION_TABLE } from "../api/question/queries";
import {
  QUESTION_TYPE_TABLE,
  createQuestionTypeTable,
} from "../api/question-type/queries";
import * as dotenv from "dotenv";

const DATABASE = "qizzo";

const createProductionDatabase = async () => {
  await pool
    .query(`CREATE DATABASE ${DATABASE}`)
    .catch((err) => console.log(err));
};

const createTables = async () => {
  await pool
    .query(
      `CREATE TABLE IF NOT EXISTS ${CATEGORY_TABLE}
  (id UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  inReview BOOLEAN NOT NULL,
  UNIQUE(name)
  )`
    )
    .then((res) => console.log(""))
    .catch((err) => console.log(err));

  await pool
    .query(createQuestionTypeTable({ table: QUESTION_TYPE_TABLE }))
    .catch((err) => console.log(err));

  await pool
    .query(createQuestionTable({ table: QUESTION_TABLE }))
    .catch((err) => console.log(err));
};

dotenv.config();

let databaseConfig;
if (process.env.TRAVIS_DATABASE) {
  databaseConfig = { connectionString: process.env.TRAVIS_DATABASE };
} else if (process.env.DATABASE_URL) {
  databaseConfig = { connectionString: process.env.DATABASE_URL };
} else {
  databaseConfig = { connectionString: process.env.LOCAL_DATABASE };
}
const pool = new Pool(databaseConfig);

if (process.env.DATABASE_URL) {
  // create-tables
  createProductionDatabase().catch();
  createTables().catch();
}

if (process.env.LOCAL_DATABASE) {
  createTables().catch();
}

export default pool;
