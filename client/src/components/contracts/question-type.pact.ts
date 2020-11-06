import { Done } from "@material-ui/icons";
import { Pact, Matchers } from "@pact-foundation/pact";
const { eachLike, like } = require("@pact-foundation/pact").Matchers;

import * as path from "path";
import { makeRequest } from "../../networking/network";
import { provider as Provider } from "./setup";

const baseport = {
  base: "127.0.0.1",
  port: "4000",
};

const provider = Provider("question-type");
describe("Question Type pacts", () => {
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
  describe("GET: On Success: Return all question types", () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: "there are question types",
        uponReceiving: "a get request",
        withRequest: {
          path: "/api/question-types",
          method: "GET",
        },
        willRespondWith: {
          status: 200,
          body: {
            success: true,
            data: eachLike({
              id: "0",
              name: "question-type",
              deleted: false,
            }),
          },
        },
      });
    });

    it("should return an array of question types", async () => {
      await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "question-types",
        method: "get",
      }).onReceive.then((result) => {
        expect(result.status).toEqual(200);
        expect(result.data.data.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe("POST", () => {
    describe("On Success: Create new Question Type", () => {
      beforeEach(async () => {
        await provider
          .addInteraction({
            state: "there are question types",
            uponReceiving: "a request to create a new question type",
            withRequest: {
              path: "/api/question-types",
              method: "POST",
              body: {
                name: "Newer",
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
                data: {
                  id: Matchers.somethingLike("0"),
                  name: "Newer",
                  deleted: false,
                },
              },
            },
          })
          .catch();
      });

      it("should create a new question type", async () => {
        await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "question-types",
          method: "post",
          data: {
            name: "Newer",
          },
        })
          .onReceive.then((result) => {
            expect(result.status).toEqual(201);
            expect(result.data.data.name).toEqual("Newer");
            expect(result.data.success).toEqual(true);
          })
          .catch();
      });
    });

    describe("ON FAIL: Doesn't create new type, returns 200 null body", () => {
      beforeEach(async () => {
        await provider
          .addInteraction({
            state: "there are question types",
            uponReceiving:
              "a request to create a question type that already exists",
            withRequest: {
              path: "/api/question-types",
              method: "POST",
              body: {
                name: "Random",
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
          })
          .catch();
      });

      it("should create a new question type", async () => {
        await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "question-types",
          method: "post",
          data: {
            name: "Random",
          },
        })
          .onReceive.then((result) => {
            expect(result.status).toEqual(200);
            expect(result.data.data).toEqual(null);
            expect(result.data.success).toEqual(false);
          })
          .catch();
      });
    });
  });

  describe("DELETE", () => {
    describe("ON SUCCESS", () => {
      beforeEach(async () => {
        await provider
          .addInteraction({
            state:
              "the question type e998c46c-6f0f-4caa-92ad-8f482859938b exists",
            uponReceiving: "a request to delete a question type",
            withRequest: {
              path: "/api/question-types/e998c46c-6f0f-4caa-92ad-8f482859938b",
              method: "DELETE",
            },
            willRespondWith: {
              status: 200,
              body: {
                success: true,
                data: {
                  id: "e998c46c-6f0f-4caa-92ad-8f482859938b",
                  deleted: true,
                },
              },
            },
          })
          .catch();
      });
      it("should delete the question type", async () => {
        await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "question-types",
          method: "delete",
          data: {
            id: "e998c46c-6f0f-4caa-92ad-8f482859938b",
          },
        })
          .onReceive.then((result) => {
            console.log(result.data.data);
            expect(result.status).toEqual(200);
            expect(result.data.data.id).toEqual(
              "e998c46c-6f0f-4caa-92ad-8f482859938b"
            );
            expect(result.data.success).toEqual(true);
            expect(result.data.data.deleted).toEqual(true);
          })
          .catch();
      });
    });
  });
});
