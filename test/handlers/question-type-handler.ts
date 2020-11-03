import {
  createQuestionType,
  createQuestionTypeTable,
} from "../../src/api/question-type/queries";
import pool from "../../src/database/pool";
import { v4 as uuidv4 } from "uuid";

export const questionTypesExist = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  await pool.query(createQuestionType(), [uuidv4(), "Random"]).catch();
  return Promise.resolve("Question Type added to database");
};

export const questionTypeAlreadyExists = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  await pool.query(createQuestionType(), [uuidv4(), "Newer"]).catch();
  return Promise.resolve("Question Type already exists");
};
