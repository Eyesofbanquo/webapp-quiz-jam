import { Done } from "@material-ui/icons";
import { Pact, Matchers } from "@pact-foundation/pact";
const { eachLike, like } = require("@pact-foundation/pact").Matchers;

import * as path from "path";
import { makeRequest } from "../../networking/network";
import { provider } from "./setup";

const baseport = {
  base: "127.0.0.1",
  port: "4000",
};

describe("Question Type pacts", () => {
  beforeAll((done) => {
    console.log("a");
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
});
