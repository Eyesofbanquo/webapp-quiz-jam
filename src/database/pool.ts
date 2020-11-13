import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { createQuestionTable } from "../api/question/queries";
import {
  createQuestionTypeTable,
  createQuestionType,
} from "../api/question-type/queries";
import * as dotenv from "dotenv";
import { createCategory, createCategoriesTable } from "../api/category/queries";

dotenv.config();

const DATABASE = "qizzo";

let databaseConfig;
if (process.env.TRAVIS_DATABASE) {
  databaseConfig = { connectionString: process.env.TRAVIS_DATABASE };
} else if (process.env.DATABASE_URL) {
  databaseConfig = { connectionString: process.env.DATABASE_URL };
} else {
  databaseConfig = { connectionString: process.env.LOCAL_DATABASE };
}
const pool = new Pool(databaseConfig);

export default pool;

/* These should be in their own helper files */

const createProductionDatabase = async () => {
  await pool
    .query(`CREATE DATABASE ${DATABASE}`)
    .catch((err) => console.log(err));
};

const createTables = async () => {
  await pool
    .query(createCategoriesTable())
    .then((res) => console.log(""))
    .catch((err) => console.log(err));

  await pool.query(createQuestionTypeTable()).catch((err) => console.log(err));

  await pool.query(createQuestionTable()).catch((err) => console.log(err));
};

const createDefaultValues = async () => {
  await createCategory({
    id: uuidv4(),
    name: "League of Legends",
    in_review: true,
    deleted: false,
  })
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => console.log(err));
  await createQuestionType({
    id: uuidv4(),
    name: "pairs",
    deleted: false,
  }).catch();
};

if (process.env.DATABASE_URL) {
  createProductionDatabase().catch();
  createTables().catch();
  createDefaultValues().catch();
}

/* Only need to make sure the database exists while the unit tests control the tables */
if (process.env.TRAVIS_DATABASE) {
  createProductionDatabase().catch();
}

/* This is to prevent the unit tests from creating unnecessary tables on launch */
if (
  process.env.LOCAL_DATABASE &&
  process.env.NODE_ENV !== "test" &&
  process.env.NODE_ENV !== "pact" &&
  process.env.NODE_ENV !== "cypress"
) {
  createTables().catch();
  createDefaultValues().catch();
}
