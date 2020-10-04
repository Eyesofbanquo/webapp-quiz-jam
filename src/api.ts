import * as express from "express";
import * as bodyParser from "body-parser";
import * as Realm from "realm";
import { Database } from "./database";

interface AnswerResponse {
  category: string;
  type: string;
  difficulty: string;
  question: string;
}

interface MultipleChoice {
  correct_answer: string;
  incorrect_answers: string[];
}

interface TFChoice {
  correct_answer: "True" | "False";
  incorrect_answers: ["True"] | ["False"];
}

const MultipleChoiceSchema = {
  name: "MultipleChoice",
  primaryKey: "question",
  properties: {
    id: "int",
    category: "string",
    type: "string",
    difficulty: "string",
    question: "string",
    correct_answer: "string",
    incorrect_answers: "string[]",
  },
};

const db = new Database();

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
  const receivedBody = request.body as AnswerResponse & MultipleChoice;

  const isValid =
    receivedBody.category !== undefined &&
    receivedBody.correct_answer !== undefined &&
    receivedBody.difficulty !== undefined &&
    receivedBody.incorrect_answers !== undefined &&
    receivedBody.question !== undefined &&
    receivedBody.correct_answer !== undefined;

  if (isValid === false) {
    response.statusCode = 400;
    response.json({
      error: "Incorrect format",
    });
  } else {
    db.realm(MultipleChoiceSchema).then((realm) => {
      realm.write(() => {
        const newQuestion = realm.create("MultipleChoice", {
          id: 0,
          category: receivedBody.category,
          type: receivedBody.type,
          difficulty: receivedBody.difficulty,
          question: receivedBody.question,
          correct_answer: receivedBody.correct_answer,
          incorrect_answers: receivedBody.incorrect_answers,
        });
      });

      realm.close();
    });

    response.statusCode = 204;
    response.send(request.body);
  }
});

API.get("/multiple", async (request, response) => {
  await db.realm(MultipleChoiceSchema).then((realm) => {
    const allObjects: any = realm.objects("MultipleChoice");
    response.send(allObjects);
    realm.close();
  });
});
