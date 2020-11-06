import { getCategoryTable } from "../../api/category/queries";
import { uuid_generate_v4 } from "uuid";
import { getQuestionTypeTable } from "../../api/question-type/queries";

export const QUESTION_TABLE = "questions";
export const QUESTION_TABLE_TEST = "questions_test";
export const QUESTION_TABLE_PACT = "questions_pact";

export const getQuestionTable = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return QUESTION_TABLE_TEST;
    case "pact":
      return QUESTION_TABLE_PACT;
    default:
      return QUESTION_TABLE;
  }
};

export const createQuestionTable = () =>
  `CREATE TABLE IF NOT EXISTS ${getQuestionTable()}
(id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  in_review BOOLEAN NOT NULL,
  correct_answers TEXT ARRAY NOT NULL,
  incorrect_answers TEXT ARRAY NOT NULL,
  category_uid UUID REFERENCES ${getCategoryTable()}(id),
  question_type_uid UUID REFERENCES ${getQuestionTypeTable()}(id),
  deleted BOOLEAN NOT NULL,
  UNIQUE(name)
  )`;

export const createQuestion = () => {
  return `INSERT INTO ${getQuestionTable()} 
  (id, name, in_review, correct_answers, incorrect_answers, category_uid, question_type_uid, deleted)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`;
};

export const getQuestions = () => {
  return `SELECT * FROM ${getQuestionTable()} WHERE deleted = false`;
};

export const deleteQuestion = () => {
  return `UPDATE ${getQuestionTable()} SET deleted = true WHERE id = $1 RETURNING *`;
};
