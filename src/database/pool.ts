import { Pool } from "pg";
import { CATEGORY_TABLE } from "../api/category/routes";
import { QUESTION_TABLE } from "../api/question/queries";
import { QUESTION_TYPE_TABLE } from "../api/question-type/queries";
import * as dotenv from "dotenv";

const DATABASE = "qizzo";

const createProductionDatabase = async () => {
  await pool
    .query(`CREATE DATABASE ${DATABASE}`)
    .catch((err) => console.log(err));

  createTables();
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
    .query(
      `
  CREATE TABLE IF NOT EXISTS ${QUESTION_TYPE_TABLE}
  (id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    UNIQUE(name)
    )`
    )
    .catch((err) => console.log(err));

  await pool
    .query(
      `
    CREATE TABLE IF NOT EXISTS ${QUESTION_TABLE}
    (id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      inReview BOOLEAN NOT NULL,
      correctAnswers TEXT ARRAY NOT NULL,
      incorrectAnswers TEXT ARRAY NOT NULL,
      category_uid UUID REFERENCES categories(id),
      question_type_uid UUID REFERENCES question_types(id),
      UNIQUE(name)
      )`
    )
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
  createProductionDatabase().catch((err) => console.log(err));
}

if (process.env.LOCAL_DATABASE) {
  createTables().catch((err) => console.log(err));
}

export default pool;
