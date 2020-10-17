import * as express from "express";
import * as bodyParser from "body-parser";
import { Database } from "./database";
import { CategoryRouter } from "./api/category/routes";
import { multipleChoiceRouter } from "./api/multiple-choice/routes";
import { Storeable } from "database/database";

const db = new Database();

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

// const controller = new APIController();

// controller.api.get("/open_reference_mult", (req, res) => {
//   const statusCode = res.statusCode;
//   const stub = require("./stubs/mult.json");

//   res.send(stub);
// });

// controller.api.get("/open_reference_tf", (request, response) => {
//   const statusCode = response.statusCode;
//   const stub = require("./stubs/boolean.json");
//   response.send(stub);
// });
