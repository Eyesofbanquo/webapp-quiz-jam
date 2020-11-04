import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import pool from "../../database/pool";
import {
  getQuestions,
  createQuestion,
  deleteQuestion,
  QUESTION_TABLE,
  QUESTION_TABLE_TEST,
} from "./queries";
const cors = require("cors");

export const questionsRouter = express.Router();

questionsRouter.use(bodyParser.json());

questionsRouter.get("/questions", (request, response) => {
  pool
    .query(getQuestions())
    .then((result) => {
      response.statusCode = 200;
      response.send({ success: true, data: result.rows });
    })
    .catch((error) => {
      response.statusCode = 403;
      response.send({ success: false, data: null });
    });
});

questionsRouter.post("/questions", async (request, response) => {
  if (request.body.categoryId.length === 0) {
    response.statusCode = 200;
    response.send({ success: false, error: "Please provide a category" });
    return;
  }

  if (request.body.questionTypeId.length === 0) {
    response.statusCode = 200;
    response.send({ success: false, error: "Please provide a question type" });
    return;
  }

  pool
    .query(createQuestion(), [
      uuidv4(),
      request.body.name,
      true,
      request.body.correctAnswers,
      request.body.incorrectAnswers,
      request.body.categoryId,
      request.body.questionTypeId,
      false,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        response.statusCode = 200;
        response.send({ success: false, data: null });
        return;
      }

      response.statusCode = 201;
      response.send({ success: true, data: result.rows[0] });
    })
    .catch((error) => {
      console.log(error, "bruhman");
      response.statusCode = 403;
      response.send({ success: false, data: null });
    });
});

questionsRouter.delete("/questions", async (request, response) => {
  pool
    .query(deleteQuestion(), [request.body.id])
    .then((result) => {
      if (result.rows.length === 0) {
        response.statusCode = 200;
        response.send({ success: false, data: null });
        return;
      }
      response.statusCode = 200;
      response.send({ success: true, data: result.rows[0] });
    })
    .catch((error) => {
      response.statusCode = 404;
      response.send({ success: false, data: null });
    });
});
