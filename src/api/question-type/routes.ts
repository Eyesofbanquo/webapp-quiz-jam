import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import pool from "../../database/pool";
import {
  createQuestionType,
  deleteQuestionType,
  getQuestionTypes,
  QUESTION_TYPE_TABLE,
  QUESTION_TYPE_TABLE_TEST,
} from "./queries";
const cors = require("cors");

const table =
  process.env.NODE_ENV === "test"
    ? QUESTION_TYPE_TABLE_TEST
    : QUESTION_TYPE_TABLE;

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

questionTypesRouter.post("/question-types", (request, response) => {
  pool
    .query(createQuestionType({ table: table }), [uuidv4(), request.body.name])
    .then((result) => {
      if (result.rows.length === 0) {
        response.statusCode = 200;
        response.send({ success: false, data: null });
        return;
      }

      response.statusCode = 201;
      response.send({ success: true, data: result.rows[0] });
    })
    .catch((err) => {
      response.statusCode = 404;
      response.send({ success: false, data: null });
    });
});

questionTypesRouter.delete("/question-types", (request, response) => {
  pool
    .query(deleteQuestionType({ table: table }), [request.body.id])
    .then((result) => {
      if (result.rows.length === 0) {
        response.statusCode = 200;
        response.send({ success: false, data: null });
        return;
      }

      response.statusCode = 200;
      response.send({ sucess: false, data: result.rows[0] });
    })
    .catch((err) => {
      response.statusCode = 404;
      response.send({ success: false, data: null });
    });
});
