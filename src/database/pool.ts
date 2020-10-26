import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { createQuestionTable, QUESTION_TABLE } from "../api/question/queries";
import {
  QUESTION_TYPE_TABLE,
  createQuestionTypeTable,
  createQuestionType,
} from "../api/question-type/queries";
import * as dotenv from "dotenv";
import { createCategory, CATEGORIES_TABLE } from "../api/category/queries";

const DATABASE = "qizzo";

const createProductionDatabase = async () => {
  await pool
    .query(`CREATE DATABASE ${DATABASE}`)
    .catch((err) => console.log(err));
};

const createTables = async () => {
  await pool
    .query(
      `CREATE TABLE IF NOT EXISTS ${CATEGORIES_TABLE}
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

const createDefaultValues = async () => {
  await pool
    .query(createCategory({ table: CATEGORIES_TABLE }), [
      uuidv4(),
      "League of Legends",
      true,
    ])
    .catch((err) => console.log(err));
  await pool
    .query(createQuestionType({ table: QUESTION_TYPE_TABLE }), [
      uuidv4(),
      "pairs",
    ])
    .catch();
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
  createDefaultValues().catch();
}

if (process.env.LOCAL_DATABASE) {
  createTables().catch();
  createDefaultValues().catch();
}

export default pool;
