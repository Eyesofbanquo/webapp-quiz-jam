import { QuestionType } from "./schema";
import pool from "../../database/pool";

export const QUESTION_TYPE_TABLE = "question_types";
export const QUESTION_TYPE_TABLE_TEST = "question_type_test";
export const QUESTION_TYPE_TABLE_PACT = "question_type_pact";
export const QUESTION_TYPE_TABLE_CYPRESS = "question_type_cypress";

export const getQuestionTypeTable = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return QUESTION_TYPE_TABLE_TEST;
    case "pact":
      return QUESTION_TYPE_TABLE_PACT;
    case "cypress":
      return QUESTION_TYPE_TABLE_CYPRESS;
    default:
      return QUESTION_TYPE_TABLE;
  }
};

interface QuestionTypeProps {
  table: typeof QUESTION_TYPE_TABLE | typeof QUESTION_TYPE_TABLE_TEST;
}

export const getQuestionTypes = () =>
  `SELECT * FROM ${getQuestionTypeTable()} WHERE deleted = false`;

export const createQuestionTypeTable = () =>
  `CREATE TABLE IF NOT EXISTS ${getQuestionTypeTable()} (id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    deleted BOOLEAN NOT NULL,
    UNIQUE(name)
    )`;

export const dropQuestionTypeTable = () =>
  `DROP TABLE ${getQuestionTypeTable()}`;

export const createQuestionType = (props: QuestionType) =>
  pool.query(
    `INSERT INTO ${getQuestionTypeTable()} (id, name, deleted) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING RETURNING *`,
    [props.id, props.name, props.deleted]
  );

export const deleteQuestionType = () =>
  `UPDATE ${getQuestionTypeTable()} SET deleted = true WHERE id = $1 RETURNING *`;
