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
  await createCategory({
    id: categoryId,
    name: "Category",
    in_review: true,
    deleted: false,
  }).catch();

  const typeId = uuidv4();
  await createQuestionType({
    id: typeId,
    name: "Type",
    deleted: false,
  }).catch();

  await pool.query(createQuestionTable()).catch();
  await createQuestion({
    id: uuidv4(),
    name: "Random",
    in_review: true,
    correct_answers: ["Correct"],
    incorrect_answers: ["incorrect", "wrong", "notright"],
    category_uid: categoryId,
    question_type_uid: typeId,
    deleted: false,
    difficulty: "normal",
  }).catch();
  return Promise.resolve("Question added to database");
};

export const questionsWithNewCategoryAndType = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createQuestionTypeTable()).catch();

  const categoryId = "54bb3cc4-e940-47bd-ba8b-f49e518333e1";
  await createCategory({
    id: categoryId,
    name: "Category2",
    in_review: true,
    deleted: false,
  }).catch();

  const typeId = "d5266e6f-d053-4090-9c53-df5fee72322b";
  await createQuestionType({
    id: typeId,
    name: "Type2",
    deleted: false,
  }).catch();

  await pool.query(createQuestionTable()).catch();
  return Promise.resolve("Question added to database");
};

export const questionABCExists = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createQuestionTypeTable()).catch();

  const categoryId = "54bb3cc4-e940-47bd-ba8b-f49e518333e1";
  await createCategory({
    id: categoryId,
    name: "Category2",
    in_review: true,
    deleted: false,
  }).catch();

  const typeId = "d5266e6f-d053-4090-9c53-df5fee72322b";
  await createQuestionType({
    id: typeId,
    name: "Type2",
    deleted: false,
  }).catch();

  await pool.query(createQuestionTable()).catch();
  await createQuestion({
    id: uuidv4(),
    name: "ABC",
    in_review: true,
    correct_answers: ["Correct"],
    incorrect_answers: ["incorrect", "wrong", "notright"],
    category_uid: categoryId,
    question_type_uid: typeId,
    deleted: false,
    difficulty: "normal",
  }).catch();
  return Promise.resolve("Question added to database");
};

export const deleteQuestionHandler = async () => {
  await pool.query(createCategoriesTable()).catch();
  await pool.query(createQuestionTypeTable()).catch();

  const categoryId = "54bb3cc4-e940-47bd-ba8b-f49e518333e1";
  await createCategory({
    id: categoryId,
    name: "Category2",
    in_review: true,
    deleted: false,
  }).catch();

  const typeId = "d5266e6f-d053-4090-9c53-df5fee72322b";
  await createQuestionType({
    id: typeId,
    name: "Type2",
    deleted: false,
  }).catch();

  await pool.query(createQuestionTable()).catch();

  await createQuestion({
    id: "49fe1601-660e-47b8-9e49-dc001a020540",
    name: "ABCDEF",
    in_review: true,
    correct_answers: ["Correct"],
    incorrect_answers: ["incorrect", "wrong", "notright"],
    category_uid: categoryId,
    question_type_uid: typeId,
    deleted: false,
    difficulty: "normal",
  }).catch();
  return Promise.resolve("Question added to database");
};
