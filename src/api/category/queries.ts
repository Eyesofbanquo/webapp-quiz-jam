import { uuid_generate_v4 } from "uuid";

export const CATEGORIES_TABLE = "categories";
export const CATEGORIES_TABLE_TEST = "category_test";
export const CATEGORIES_TABLE_PACT = "category_pact";

export const getCategoryTable = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return CATEGORIES_TABLE_TEST;
    case "pact":
      return CATEGORIES_TABLE_PACT;
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
  UNIQUE(name)
  )`;

export const createCategory = () => {
  return `INSERT INTO ${getCategoryTable()} 
  (id, name, in_review, deleted)
  VALUES ($1, $2, $3, $4)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`;
};

export const getCategories = () => {
  return `SELECT * FROM ${getCategoryTable()} WHERE deleted = false`;
};

export const deleteCategory = () => {
  return `UPDATE ${getCategoryTable()} SET deleted = true WHERE id = $1 RETURNING *`;
};
