import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { CategoryRouter } from "./api/category/routes";
import { questionsRouter } from "./api/question/routes";
import { questionTypesRouter } from "./api/question-type/routes";
import { difficultyRouter } from "./api/difficulty/routes";
import { decodeJWTMiddleware } from "middleware/jwt-middleware";

export class APIController {
  api: express.Router;

  constructor() {
    this.api = express.Router();
    this.api.use(bodyParser.json());

    const categoryRouter = new CategoryRouter();

    this.api.use(categoryRouter.router);
    this.api.use(questionsRouter);
    this.api.use(questionTypesRouter);
    this.api.use(difficultyRouter);
  }
}
