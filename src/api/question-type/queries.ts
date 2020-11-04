export const QUESTION_TYPE_TABLE = "question_types";
export const QUESTION_TYPE_TABLE_TEST = "question_type_test";

export const QUESTION_TYPE_TABLE_PACT = "question_type_pact";

export const getQuestionTypeTable = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return QUESTION_TYPE_TABLE_TEST;
    case "pact":
      return QUESTION_TYPE_TABLE_PACT;
    default:
      return QUESTION_TYPE_TABLE;
  }
};

interface QuestionTypeProps {
  table: typeof QUESTION_TYPE_TABLE | typeof QUESTION_TYPE_TABLE_TEST;
}

export const getQuestionTypes = () => `SELECT * FROM ${getQuestionTypeTable()}`;

export const createQuestionTypeTable = () =>
  `CREATE TABLE IF NOT EXISTS ${getQuestionTypeTable()} (id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    deleted BOOLEAN NOT NULL,
    UNIQUE(name)
    )`;

export const dropQuestionTypeTable = () =>
  `DROP TABLE ${getQuestionTypeTable()}`;

export const createQuestionType = () =>
  `INSERT INTO ${getQuestionTypeTable()} (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING RETURNING *`;

export const deleteQuestionType = () =>
  `DELETE FROM ${getQuestionTypeTable()} WHERE id = $1 RETURNING *`;
