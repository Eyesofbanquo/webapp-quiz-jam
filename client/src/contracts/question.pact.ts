import { Done } from "@material-ui/icons";
import { Pact, Matchers } from "@pact-foundation/pact";
import { somethingLike } from "@pact-foundation/pact/dsl/matchers";
const { eachLike, like } = require("@pact-foundation/pact").Matchers;

import * as path from "path";
import { makeRequest } from "../networking/network";
import { provider as Provider } from "./setup";

const baseport = {
  base: "127.0.0.1",
  port: "4000",
};

const provider = Provider("question");
describe("Question pacts", () => {
  beforeAll((done) => {
    provider.setup().then(() => {
      done();
    });
  });

  afterAll((done) => {
    provider.finalize().then(() => done());
  });

  afterEach(async () => {
    await provider.verify();
  });

  describe("GET: On Success: Return an array of questions", () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: "questions exist",
        uponReceiving: "a request to retrieve questions",
        withRequest: {
          path: "/api/questions",
          method: "GET",
        },
        willRespondWith: {
          status: 200,
          body: {
            success: true,
            data: eachLike({
              id: "0",
              name: "Question",
              correct_answers: eachLike("Answer"),
              incorrect_answers: eachLike("Incorrect"),
              category_uid: Matchers.somethingLike("0"),
              question_type_uid: Matchers.somethingLike("0"),
              in_review: true,
              deleted: false,
              user: somethingLike({
                user_id: somethingLike("6ce02d16-2fb5-4b22-a3ae-f618f198c9c9"),
              }),
            }),
          },
        },
      });
    });

    it("should return an array of questions", async () => {
      await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "questions",
        method: "get",
      }).onReceive.then((result) => {
        expect(result.status).toEqual(200);
        expect(result.data.success).toEqual(true);
        expect(result.data.data.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("POST", () => {
    describe("ON SUCCESS", () => {
      beforeEach(async () => {
        await provider.addInteraction({
          state: "questions exist with new category and question type ids",
          uponReceiving: "a request to create a new question",
          withRequest: {
            path: "/api/questions",
            method: "POST",
            body: {
              name: "New Question",
              correctAnswers: ["One"],
              incorrectAnswers: ["Two", "Three", "Four"],
              categoryId: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
              questionTypeId: "d5266e6f-d053-4090-9c53-df5fee72322b",
              user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
          willRespondWith: {
            status: 201,
            body: {
              success: true,
              data: Matchers.somethingLike({
                id: "0",
                name: "New Question",
                correct_answers: ["1"],
                incorrect_answers: ["2", "3", "4"],
                in_review: true,
                category_uid: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
                question_type_uid: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
                deleted: false,
              }),
            },
          },
        });
      });

      it("should create a new question", async () => {
        await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "questions",
          method: "post",
          data: {
            name: "New Question",
            correctAnswers: ["One"],
            incorrectAnswers: ["Two", "Three", "Four"],
            categoryId: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
            questionTypeId: "d5266e6f-d053-4090-9c53-df5fee72322b",
            user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
          },
        }).onReceive.then((result) => {
          expect(result.status).toEqual(201);
          expect(result.data.success).toEqual(true);
          expect(result.data.data).not.toBeNull();
        });
      });
    });

    describe("ON FAILURE", () => {
      describe("When trying to create a question that already exists", () => {
        beforeEach(async () => {
          await provider.addInteraction({
            state:
              "ABC question exists with new category and question type ids",
            uponReceiving: "a request to create a question that already exists",
            withRequest: {
              path: "/api/questions",
              method: "POST",
              body: {
                name: "ABC",
                correctAnswers: ["One"],
                incorrectAnswers: ["Two", "Three", "Four"],
                categoryId: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
                questionTypeId: "d5266e6f-d053-4090-9c53-df5fee72322b",
                user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
            willRespondWith: {
              status: 200,
              body: {
                success: false,
                data: null,
              },
            },
          });
        });

        it("should not create a new question", async () => {
          await makeRequest({
            base: "127.0.0.1",
            port: "4000",
            endpoint: "questions",
            method: "post",
            data: {
              name: "ABC",
              correctAnswers: ["One"],
              incorrectAnswers: ["Two", "Three", "Four"],
              categoryId: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
              questionTypeId: "d5266e6f-d053-4090-9c53-df5fee72322b",
              user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
            },
          }).onReceive.then((result) => {
            expect(result.data.success).toBe(false);
            expect(result.status).toEqual(200);
            expect(result.data.data).toBeNull();
          });
        });
      });

      describe("When trying to create a question without a category", () => {
        beforeEach(async () => {
          await provider.addInteraction({
            state:
              "ABC question exists with new category and question type ids",
            uponReceiving: "a request to create a question without a category",
            withRequest: {
              path: "/api/questions",
              method: "POST",
              body: {
                name: "Add",
                correctAnswers: ["One"],
                incorrectAnswers: ["Two", "Three", "Four"],
                categoryId: "",
                questionTypeId: "d5266e6f-d053-4090-9c53-df5fee72322b",
                user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
            willRespondWith: {
              status: 200,
              body: {
                success: false,
                error: "Please provide a category",
              },
            },
          });
        });

        it("should not create a new question", async () => {
          await makeRequest({
            base: "127.0.0.1",
            port: "4000",
            endpoint: "questions",
            method: "post",
            data: {
              name: "Add",
              correctAnswers: ["One"],
              incorrectAnswers: ["Two", "Three", "Four"],
              categoryId: "",
              questionTypeId: "d5266e6f-d053-4090-9c53-df5fee72322b",
              user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
            },
          }).onReceive.then((result) => {
            expect(result.data.success).toBe(false);
            expect(result.status).toEqual(200);
            expect(result.data.error).not.toBeNull();
          });
        });
      });
      describe("When trying to create a question without a question type", () => {
        beforeEach(async () => {
          await provider.addInteraction({
            state:
              "ABC question exists with new category and question type ids",
            uponReceiving:
              "a request to create a question without a question type",
            withRequest: {
              path: "/api/questions",
              method: "POST",
              body: {
                name: "Add",
                correctAnswers: ["One"],
                incorrectAnswers: ["Two", "Three", "Four"],
                categoryId: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
                questionTypeId: "",
                user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
            willRespondWith: {
              status: 200,
              body: {
                success: false,
                error: "Please provide a question type",
              },
            },
          });
        });

        it("should not create a new question", async () => {
          await makeRequest({
            base: "127.0.0.1",
            port: "4000",
            endpoint: "questions",
            method: "post",
            data: {
              name: "Add",
              correctAnswers: ["One"],
              incorrectAnswers: ["Two", "Three", "Four"],
              categoryId: "54bb3cc4-e940-47bd-ba8b-f49e518333e1",
              questionTypeId: "",
              user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
            },
          }).onReceive.then((result) => {
            expect(result.data.success).toBe(false);
            expect(result.status).toEqual(200);
            expect(result.data.error).not.toBeNull();
          });
        });
      });
    });
  });

  describe("DELETE", () => {
    describe("ON SUCCESS", () => {
      beforeEach(async () => {
        await provider.addInteraction({
          state: "question 49fe1601-660e-47b8-9e49-dc001a020540 exists",
          uponReceiving: "a request to delete question",
          withRequest: {
            path: "/api/questions/49fe1601-660e-47b8-9e49-dc001a020540",
            method: "DELETE",
          },
          willRespondWith: {
            status: 200,
            body: {
              success: true,
              data: {
                id: "49fe1601-660e-47b8-9e49-dc001a020540",
                deleted: true,
              },
            },
          },
        });
      });

      it("should delete question", async () => {
        await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "questions",
          method: "delete",
          data: {
            id: "49fe1601-660e-47b8-9e49-dc001a020540",
          },
        }).onReceive.then((result) => {
          expect(result.data.success).toBe(true);
          expect(result.status).toEqual(200);
          expect(result.data.data.id).toEqual(
            "49fe1601-660e-47b8-9e49-dc001a020540"
          );
          expect(result.data.data.deleted).toEqual(true);
        });
      });
    });
  });
});
