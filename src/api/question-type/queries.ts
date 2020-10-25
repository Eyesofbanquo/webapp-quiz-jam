export const QUESTION_TYPE_TABLE = "question_types";
export const QUESTION_TYPE_TABLE_TEST = "question_type_test";

interface QuestionTypeProps {
  table: typeof QUESTION_TYPE_TABLE | typeof QUESTION_TYPE_TABLE_TEST;
}

export const getQuestionTypes = (props: QuestionTypeProps) =>
  `SELECT * FROM ${props.table}`;

export const createQuestionTypeTable = (props: QuestionTypeProps) =>
  `CREATE TABLE IF NOT EXISTS ${props.table} (id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    UNIQUE(name)
    )`;

export const dropQuestionTypeTable = (props: QuestionTypeProps) =>
  `DROP TABLE ${props.table}`;

export const createQuestionType = (props: QuestionTypeProps) =>
  `INSERT INTO ${props.table} (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING RETURNING *`;

export const deleteQuestionType = (props: QuestionTypeProps) =>
  `DELETE FROM ${props.table} WHERE id = $1 RETURNING *`;
