import { StateHandler } from "@pact-foundation/pact";
import {
  createCategoriesTable,
  createCategory,
} from "../../src/api/category/queries";
import pool from "../../src/database/pool";
import { v4 as uuidv4 } from "uuid";

export const categoriesExist = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createCategory(), [uuidv4(), "Random", true]).catch();
  return Promise.resolve("Categories added to database");
};

export const categoryNightExist = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createCategory(), [uuidv4(), "Night", true]).catch();
  return Promise.resolve("Category Night added to database");
};
