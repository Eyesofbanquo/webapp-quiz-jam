import { uuid_generate_v4 } from "uuid";

export const CATEGORIES_TABLE = "categories";
export const CATEGORIES_TABLE_TEST = "category_test";

interface CategoryProps {
  table: typeof CATEGORIES_TABLE | typeof CATEGORIES_TABLE_TEST;
}

export const createCategoriesTable = (props: CategoryProps) =>
  `CREATE TABLE IF NOT EXISTS ${props.table}
(id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  inReview BOOLEAN NOT NULL,
  UNIQUE(name)
  )`;

export const createCategory = (props: CategoryProps) => {
  return `INSERT INTO ${props.table} 
  (id, name, inReview)
  VALUES ($1, $2, $3)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`;
};

export const getCategories = (props: CategoryProps) => {
  return `SELECT * FROM ${props.table}`;
};

export const deleteCategory = (props: CategoryProps) => {
  return `DELETE FROM ${props.table} WHERE id = $1 RETURNING *`;
};
