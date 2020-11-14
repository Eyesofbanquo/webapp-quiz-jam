import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import {
  createQuestionTable,
  dropQuestionTable,
} from "../api/question/queries";
import {
  createQuestionTypeTable,
  createQuestionType,
  dropQuestionTypeTable,
} from "../api/question-type/queries";
import * as dotenv from "dotenv";
import {
  createCategory,
  createCategoriesTable,
  dropCategoryTable,
} from "../api/category/queries";

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

const setupTables = async () => {
  if (
    process.env.LOCAL_DATABASE &&
    process.env.NODE_ENV !== "test" &&
    process.env.NODE_ENV !== "pact" &&
    process.env.NODE_ENV !== "cypress"
  ) {
    await createTables().catch();
    await createDefaultValues().catch();
  }
};

export const setupCypressTables = async () => {
  console.log("ok");
  console.log("EHEIHIE");
  if (process.env.NODE_ENV === "cypress") {
    // await dropTables().catch();
    console.log("ok");
    console.log("EHEIHIE");
    await createTables().catch();
    await createDefaultValues().catch();
  }
};

export const dropTables = async () => {
  await pool.query(dropQuestionTable()).catch();
  await pool.query(dropQuestionTypeTable()).catch();
  await pool.query(dropCategoryTable()).catch();
};

export const seedCategoryUUID = uuidv4();
export const seedQuestionTypeUUID = uuidv4();

const createDefaultValues = async () => {
  await createCategory({
    id: seedCategoryUUID,
    name: "League of Legends",
    in_review: true,
    deleted: false,
  }).catch((err) => console.log(err));
  await createQuestionType({
    id: seedQuestionTypeUUID,
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
setupTables().catch();
