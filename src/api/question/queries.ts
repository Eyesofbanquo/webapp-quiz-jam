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
  inReview BOOLEAN NOT NULL,
  correctAnswers TEXT ARRAY NOT NULL,
  incorrectAnswers TEXT ARRAY NOT NULL,
  category_uid UUID REFERENCES ${getCategoryTable()}(id),
  question_type_uid UUID REFERENCES ${getQuestionTypeTable()}(id),
  deleted BOOLEAN NOT NULL,
  UNIQUE(name)
  )`;

export const createQuestion = () => {
  return `INSERT INTO ${getQuestionTable()} 
  (id, name, inReview, correctAnswers, incorrectAnswers, category_uid, question_type_uid)
   VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`;
};

export const getQuestions = () => {
  return `SELECT * FROM ${getQuestionTable()}`;
};

export const deleteQuestion = () => {
  return `DELETE FROM ${getQuestionTable()} WHERE id = $1 RETURNING *`;
};
