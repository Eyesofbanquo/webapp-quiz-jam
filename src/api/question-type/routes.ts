import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import pool from "../../database/pool";
import {
  getQuestionTypes,
  QUESTION_TYPE_TABLE,
  QUESTION_TYPE_TABLE_TEST,
} from "./queries";
const cors = require("cors");

const table =
  process.env.NODE_ENV === "test"
    ? QUESTION_TYPE_TABLE_TEST
    : QUESTION_TYPE_TABLE;

export const QUESTION_TYPE_GENERIC_ENDPOINT = "/api/question-types";

export const questionTypesRouter = express.Router();

questionTypesRouter.use(bodyParser.json());

questionTypesRouter.get("/question-types", (request, response) => {
  pool
    .query(getQuestionTypes({ table: table }))
    .then((result) => {
      response.statusCode = 200;
      response.send({ success: true, data: result.rows });
    })
    .catch((err) => {
      response.statusCode = 404;
      response.send({ success: false, data: null });
    });
});
