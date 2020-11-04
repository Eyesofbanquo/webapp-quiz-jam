// questions exist
import pool from "../../src/database/pool";
import { v4 as uuidv4 } from "uuid";
import {
  createQuestionTable,
  createQuestion,
} from "../../src/api/question/queries";
import {
  createCategoriesTable,
  createCategory,
} from "../../src/api/category/queries";
import {
  createQuestionType,
  createQuestionTypeTable,
} from "../../src/api/question-type/queries";

export const questionsExist = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createQuestionTypeTable()).catch();

  const categoryId = uuidv4();
  await pool
    .query(createCategory(), [categoryId, "Category", true, false])
    .catch();

  const typeId = uuidv4();
  await pool.query(createQuestionType(), [typeId, "Type", false]).catch();

  await pool.query(createQuestionTable()).catch();
  await pool
    .query(createQuestion(), [
      uuidv4(),
      "Random",
      true,
      ["Correct"],
      ["incorrect", "wrong", "notright"],
      categoryId,
      typeId,
      false,
    ])
    .catch();
  return Promise.resolve("Question added to database");
};

export const questionsWithNewCategoryAndType = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createQuestionTypeTable()).catch();

  const categoryId = "54bb3cc4-e940-47bd-ba8b-f49e518333e1";
  await pool
    .query(createCategory(), [categoryId, "Category2", true, false])
    .catch();

  const typeId = "d5266e6f-d053-4090-9c53-df5fee72322b";
  await pool.query(createQuestionType(), [typeId, "Type2", false]).catch();

  await pool.query(createQuestionTable()).catch();
  return Promise.resolve("Question added to database");
};

export const questionABCExists = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createQuestionTypeTable()).catch();

  const categoryId = "54bb3cc4-e940-47bd-ba8b-f49e518333e1";
  await pool
    .query(createCategory(), [categoryId, "Category2", true, false])
    .catch();

  const typeId = "d5266e6f-d053-4090-9c53-df5fee72322b";
  await pool.query(createQuestionType(), [typeId, "Type2", false]).catch();

  await pool.query(createQuestionTable()).catch();
  await pool
    .query(createQuestion(), [
      uuidv4(),
      "ABC",
      true,
      ["Correct"],
      ["incorrect", "wrong", "notright"],
      categoryId,
      typeId,
      false,
    ])
    .catch();
  return Promise.resolve("Question added to database");
};
