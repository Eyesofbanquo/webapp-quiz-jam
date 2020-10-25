import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { AnswerResponse, MultipleChoice, MultipleChoiceSchema } from "./schema";

export const multipleChoiceRouter = express.Router();
multipleChoiceRouter.use(bodyParser.json());

multipleChoiceRouter.post("/multiple", (request, response) => {
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
    // db.realm(MultipleChoiceSchema).then((realm) => {
    //   const allObjects = realm
    //     .objects("MultipleChoice")
    //     .filtered(`question CONTAINS[c] "${receivedBody.question}"`);
    //   if (allObjects.length > 0) {
    //     response.statusCode = 500;
    //     response.send({ error: true });
    //     realm.close();
    //     return;
    //   }
    //   realm.write(() => {
    //     const newQuestion = realm.create("MultipleChoice", {
    //       id: uuidv4(),
    //       inReview: true,
    //       ...receivedBody,
    //     });
    //   });
    //   realm.close();
    // });
    // response.statusCode = 204;
    // response.send(request.body);
  }
});

multipleChoiceRouter.get("/multiple", async (request, response) => {
  // await db.realm(MultipleChoiceSchema).then((realm) => {
  //   const allObjects: any = realm.objects("MultipleChoice");
  //   response.send(allObjects);
  //   realm.close();
  // });
});

multipleChoiceRouter.delete("/multiple", (request, response) => {
  // db.realm(MultipleChoiceSchema).then((realm) => {
  //   const allObjects = realm
  //     .objects("MultipleChoice")
  //     .filtered(`id == "${request.body.id}"`);
  //   if (allObjects.length === 0) {
  //     response.send({ success: false });
  //     realm.close();
  //     return;
  //   }
  //   const foundObject = allObjects[0];
  //   realm.write(() => {
  //     realm.delete(foundObject);
  //   });
  //   response.send({ success: true });
  //   realm.close();
  // });
});
