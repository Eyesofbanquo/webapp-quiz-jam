import { uuid_generate_v4 } from "uuid";
import pool from "../../database/pool";
import { Category } from "./schema";

export const CATEGORIES_TABLE = "categories";
export const CATEGORIES_TABLE_TEST = "category_test";
export const CATEGORIES_TABLE_PACT = "category_pact";
export const CATEGORIES_TABLE_CYPRESS = "category_cypress";

export const getCategoryTable = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return CATEGORIES_TABLE_TEST;
    case "pact":
      return CATEGORIES_TABLE_PACT;
    case "cypress":
      return CATEGORIES_TABLE_CYPRESS;
    default:
      return CATEGORIES_TABLE;
  }
};

export const createCategoriesTable = () =>
  `CREATE TABLE IF NOT EXISTS ${getCategoryTable()}
(id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  in_review BOOLEAN NOT NULL,
  deleted BOOLEAN NOT NULL,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id UUID NOT NULL,
  UNIQUE(name)
  )`;

export const createCategory = (props: Category) => {
  return pool.query(
    `INSERT INTO ${getCategoryTable()} 
  (id, name, in_review, deleted, user_id)
  VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`,
    [props.id, props.name, props.in_review, props.deleted, props.user_id]
  );
};

export const getCategories = () => {
  //return `SELECT * FROM ${getCategoryTable()} WHERE deleted = false`;
  return `
  WITH data AS (
    SELECT * FROM ${getCategoryTable()}
  ), category_data AS (
    SELECT id, name, in_review, deleted, created_date FROM data
  ), user_info AS (
    SELECT id as category_id, user_id FROM data
  ), jsonData AS (
    SELECT c.*, row_to_json(ui) as User
    FROM category_data c
    INNER JOIN user_info ui
    ON c.id = ui.category_id
  )
  SELECT * FROM jsonData WHERE deleted = false;`;
};

export const deleteCategory = () => {
  return `UPDATE ${getCategoryTable()} SET deleted = true WHERE id = $1 RETURNING *`;
};

export const dropCategoryTable = () => {
  return `DROP TABLE ${getCategoryTable()}`;
};
