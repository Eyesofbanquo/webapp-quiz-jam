import * as express from "express";
import * as bodyParser from "body-parser";
import * as Realm from "realm";

interface AnswerResponse {
  category: string;
  type: string;
  difficulty: string;
  question: string;
}

interface MultipleChoice {
  correct_answer: string;
  incorrect_answer: string[];
}

interface TFChoice {
  correct_answer: "True" | "False";
  incorrect_answer: ["True"] | ["False"];
}

const choice: TFChoice = {
  correct_answer: "True",
  incorrect_answer: ["False"],
};

const MultipleChoiceSchema = {
  name: "MultipleChoice",
  properties: {
    category: "string",
    type: "string",
    difficulty: "string",
    question: "string",
    correct_answer: "string",
    incorrect_answer: "string[]",
  },
};

export const API = express.Router();
API.use(bodyParser.json());

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

type AnsweredResponse = AnswerResponse | undefined;

API.post("/multiple", (request, response) => {
  const receivedBody = request.body;

  response.send(request.body);
});
