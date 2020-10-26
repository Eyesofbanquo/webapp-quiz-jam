import { uuid_generate_v4 } from "uuid";

export const QUESTION_TABLE = "questions";
export const QUESTION_TABLE_TEST = "questions_test";

interface QuestionProps {
  table: typeof QUESTION_TABLE | typeof QUESTION_TABLE_TEST;
}

export const createQuestionTable = (props: QuestionProps) =>
  `CREATE TABLE IF NOT EXISTS ${props.table}
(id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  inReview BOOLEAN NOT NULL,
  correctAnswers TEXT ARRAY NOT NULL,
  incorrectAnswers TEXT ARRAY NOT NULL,
  category_uid UUID REFERENCES categories(id),
  question_type_uid UUID REFERENCES question_types(id),
  UNIQUE(name)
  )`;

export const createQuestion = (props: QuestionProps) => {
  return `INSERT INTO ${props.table} 
  (id, name, inReview, correctAnswers, incorrectAnswers, category_uid, question_type_uid)
   VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (name) DO NOTHING
     RETURNING *`;
};

export const getQuestions = (props: QuestionProps) => {
  return `SELECT * FROM ${props.table}`;
};

export const deleteQuestion = (props: QuestionProps) => {
  return `DELETE FROM ${props.table} WHERE id = $1 RETURNING *`;
};
