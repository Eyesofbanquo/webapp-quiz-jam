import { StateHandler } from "@pact-foundation/pact";
import {
  createCategoriesTable,
  createCategory,
} from "../../src/api/category/queries";
import pool from "../../src/database/pool";
import { v4 as uuidv4 } from "uuid";

export const categoriesExist = async () => {
  await pool.query(createCategoriesTable()).catch();
  await createCategory({
    id: uuidv4(),
    name: "Random",
    in_review: true,
    deleted: false,
  }).catch();
  return Promise.resolve("Categories added to database");
};

export const categoryNightExist = async () => {
  await pool.query(createCategoriesTable()).catch();
  await createCategory({
    id: uuidv4(),
    name: "Night",
    in_review: true,
    deleted: false,
  }).catch();
  return Promise.resolve("Category Night added to database");
};

export const deleteCategoryWithUUID = async () => {
  await pool.query(createCategoriesTable()).catch();
  await createCategory({
    id: "97dcb062-ffea-4885-baf3-a04ede5b0037",
    name: "Ra",
    in_review: true,
    deleted: false,
  }).catch();
  return Promise.resolve(
    "Category with uuid 97dcb062-ffea-4885-baf3-a04ede5b0037 created"
  );
};
