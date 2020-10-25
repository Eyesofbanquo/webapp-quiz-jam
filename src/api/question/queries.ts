import { uuid_generate_v4 } from "uuid";
import pool from "../../database/pool";

export const QUESTION_TABLE = "questions";
export const QUESTION_TABLE_TEST = "questions_test";

export const CREATE_QUESTION_TABLE = `CREATE TABLE IF NOT EXISTS ${QUESTION_TABLE}
(id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  inReview BOOLEAN NOT NULL,
  correctAnswers TEXT ARRAY NOT NULL,
  incorrectAnswers TEXT ARRAY NOT NULL,
  category_uid UUID REFERENCES categories(id),
  question_type_uid UUID REFERENCES question_types(id),
  UNIQUE(name)
  )`;

export const createQuestion = (props: { database: string }) => {
  return `INSERT INTO ${props.database} 
  (id, name, inReview, correctAnswers, incorrectAnswers, category_uid, question_type_uid)
   VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`;
};

export const getQuestions = (props: { database: string }) => {
  return `SELECT * FROM ${props.database}`;
};

export const deleteQuestion = (props: { database: string }) => {
  return `DELETE FROM ${props.database} WHERE id = $1 RETURNING *`;
};
