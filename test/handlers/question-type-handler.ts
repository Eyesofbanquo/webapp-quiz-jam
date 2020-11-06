import {
  createQuestionType,
  createQuestionTypeTable,
} from "../../src/api/question-type/queries";
import pool from "../../src/database/pool";
import { v4 as uuidv4 } from "uuid";

export const questionTypesExist = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  await pool.query(createQuestionType(), [uuidv4(), "Random", false]).catch();
  return Promise.resolve("Question Type added to database");
};

export const questionTypeAlreadyExists = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  await pool.query(createQuestionType(), [uuidv4(), "Newer", false]).catch();
  return Promise.resolve("Question Type already exists");
};

export const deleteQuestionTypeHandler = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  const uuid = "e998c46c-6f0f-4caa-92ad-8f482859938b";
  await pool.query(createQuestionType(), [uuid, "N", false]).catch();
  return Promise.resolve(
    "Question type e998c46c-6f0f-4caa-92ad-8f482859938b exists"
  );
};
