import { getCategoryTable } from "../../api/category/queries";
import { uuid_generate_v4 } from "uuid";
import { getQuestionTypeTable } from "../../api/question-type/queries";
import pool from "../../database/pool";
import { Question } from "./schema";

export const QUESTION_TABLE = "questions";
export const QUESTION_TABLE_TEST = "questions_test";
export const QUESTION_TABLE_PACT = "questions_pact";
export const QUESTION_TABLE_CYPRESS = "questions_cypress";

export const getQuestionTable = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return QUESTION_TABLE_TEST;
    case "pact":
      return QUESTION_TABLE_PACT;
    case "cypress":
      return QUESTION_TABLE_CYPRESS;
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
  difficulty TEXT NOT NULL,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id UUID NOT NULL,
  UNIQUE(name)
  )`;

export const createQuestion = (props: Question) => {
  return pool.query(
    `INSERT INTO ${getQuestionTable()} 
  (id, name, in_review, correct_answers, incorrect_answers, category_uid, question_type_uid, deleted, difficulty, user_id)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`,
    [
      props.id,
      props.name,
      props.in_review,
      props.correct_answers,
      props.incorrect_answers,
      props.category_uid,
      props.question_type_uid,
      props.deleted,
      props.difficulty,
      props.user_id,
    ]
  );
};

export const getQuestions = () => {
  return `SELECT * FROM ${getQuestionTable()} WHERE deleted = false`;
};

export const deleteQuestion = () => {
  return `UPDATE ${getQuestionTable()} SET deleted = true WHERE id = $1 RETURNING *`;
};

export const dropQuestionTable = () => {
  return `DROP TABLE ${getQuestionTable()}`;
};
