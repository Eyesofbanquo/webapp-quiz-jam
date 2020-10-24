import { Pool, Client } from "pg";
import * as dotenv from "dotenv";

const createProductionDatabase = async () => {
  await pool.query(`CREATE DATABASE qizzo`).catch((err) => console.log(err));

  createTables();
};

const createTables = async () => {
  await pool
    .query(
      `CREATE TABLE IF NOT EXISTS category
  (id UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  inReview BOOLEAN NOT NULL,
  UNIQUE(name)
  )`
    )
    .then((res) => console.log(""))
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
