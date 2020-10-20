import * as express from "express";
import * as bodyParser from "body-parser";
import { Database } from "./database";
import { v4 as uuidv4 } from "uuid";
import { CategoryRouter } from "./api/category/routes";
import { multipleChoiceRouter } from "./api/multiple-choice/routes";
import { Storeable } from "database/database";

const db = new Database();

// export const API = express.Router();

export class APIController {
  api: express.Router;
  db: Storeable;

  constructor(db: Storeable = new Database()) {
    this.db = db;
    this.api = express.Router();
    this.api.use(bodyParser.json());

    const categoryRouter = new CategoryRouter(db);
    this.api.use("/", categoryRouter.router);

    this.api.use("/", multipleChoiceRouter);
  }
}
