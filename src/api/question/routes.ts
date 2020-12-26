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

  createQuestion({
    id: uuidv4(),
    name: request.body.name,
    in_review: true,
    correct_answers: request.body.correctAnswers,
    incorrect_answers: request.body.incorrectAnswers,
    category_uid: request.body.categoryId,
    question_type_uid: request.body.questionTypeId,
    deleted: false,
    difficulty: "normal",
    user_id: request.body.user_id,
  })
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

questionsRouter.delete("/questions/:id", async (request, response) => {
  pool
    .query(deleteQuestion(), [request.params.id])
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
