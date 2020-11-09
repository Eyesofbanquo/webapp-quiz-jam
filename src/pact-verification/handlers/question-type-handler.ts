import {
  createQuestionType,
  createQuestionTypeTable,
} from "../../api/question-type/queries";
import pool from "../../database/pool";
import { v4 as uuidv4 } from "uuid";

export const questionTypesExist = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  await createQuestionType({
    id: uuidv4(),
    name: "Random",
    deleted: false,
  }).catch();
  return Promise.resolve("Question Type added to database");
};

export const questionTypeAlreadyExists = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  await createQuestionType({
    id: uuidv4(),
    name: "Newer",
    deleted: false,
  }).catch();
  return Promise.resolve("Question Type already exists");
};

export const deleteQuestionTypeHandler = async () => {
  await pool.query(createQuestionTypeTable()).catch();
  const uuid = "e998c46c-6f0f-4caa-92ad-8f482859938b";
  await createQuestionType({ id: uuid, name: "N", deleted: false }).catch();
  return Promise.resolve(
    "Question type e998c46c-6f0f-4caa-92ad-8f482859938b exists"
  );
};
