import { Done } from "@material-ui/icons";
import { Pact, Matchers } from "@pact-foundation/pact";
const { eachLike, like } = require("@pact-foundation/pact").Matchers;

import * as path from "path";
import { makeRequest } from "../networking/network";
import { provider as Provider } from "./setup";

const baseport = {
  base: "127.0.0.1",
  port: "4000",
};

const provider = Provider("difficulty");

describe("Difficulty Pact Test", () => {
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

  describe("GET", () => {
    describe("ON SUCCESS", () => {
      beforeEach(async () => {
        await provider.addInteraction({
          state: "Difficulty exists",
          uponReceiving: "request for difficulty",
          withRequest: {
            path: "/api/difficulty",
            method: "GET",
          },
          willRespondWith: {
            status: 200,
            body: {
              success: true,
              data: ["easy", "normal", "hard"],
            },
          },
        });
      });

      it("should retrieve available difficulty", async () => {
        await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          method: "get",
          endpoint: "difficulty",
        }).onReceive.then((result) => {
          expect(result.status).toEqual(200);
          expect(result.data.success).toEqual(true);
          expect(result.data.data).toContain("easy");
          expect(result.data.data).toContain("normal");
          expect(result.data.data).toContain("hard");
        });
      });
    });
  });
});
