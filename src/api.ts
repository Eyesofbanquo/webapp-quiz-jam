import * as express from "express";
import * as bodyParser from "body-parser";
import { Database } from "./database";
import { v4 as uuidv4 } from "uuid";
import { categoryRouter } from "./api/category/routes";
import { multipleChoiceRouter } from "./api/multiple-choice/routes";

const db = new Database();

export const API = express.Router();
API.use(bodyParser.json());
API.use("/", categoryRouter);
API.use("/", multipleChoiceRouter);

API.get("/open_reference_mult", (req, res) => {
  const statusCode = res.statusCode;
  const stub = require("./stubs/mult.json");

  res.send(stub);
});

API.get("/open_reference_tf", (request, response) => {
  const statusCode = response.statusCode;
  const stub = require("./stubs/boolean.json");
  response.send(stub);
});
