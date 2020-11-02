export const QUESTION_TYPE_TABLE = "question_types";
export const QUESTION_TYPE_TABLE_TEST = "question_type_test";

export const QUESTION_TYPE_TABLE_PACT = "question_type_pact";

export const getQuestionTable = () => {
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

export const getQuestionTypes = () => `SELECT * FROM ${getQuestionTable()}`;

export const createQuestionTypeTable = () =>
  `CREATE TABLE IF NOT EXISTS ${getQuestionTable()} (id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    UNIQUE(name)
    )`;

export const dropQuestionTypeTable = () => `DROP TABLE ${getQuestionTable()}`;

export const createQuestionType = () =>
  `INSERT INTO ${getQuestionTable()} (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING RETURNING *`;

export const deleteQuestionType = () =>
  `DELETE FROM ${getQuestionTable()} WHERE id = $1 RETURNING *`;
