import * as dotenv from "dotenv";
dotenv.config();
import { Matchers } from "@pact-foundation/pact";
const { eachLike, like } = require("@pact-foundation/pact").Matchers;

import { makeRequest } from "../networking/network";
import { provider as Provider } from "./setup";

const baseport = {
  base: "127.0.0.1",
  port: "4000",
};

console.log(process.env.PACT, "pact");

const path = process.env.REACT_APP_AUTH_SERVICE_URI;

const provider = Provider("register");

describe("Pact with Avon API", () => {
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

  describe("Registering", () => {
    describe("Given 0 input for username or password", () => {
      beforeEach(async () => {
        await provider.addInteraction({
          state: "the service is up",
          uponReceiving: "no username and no password",
          withRequest: {
            path: `/register`,
            method: "POST",
            body: {
              username: "",
              password: "",
            },
          },
          willRespondWith: {
            body: {
              success: Matchers.like(false),
            },
            status: 422,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        });
      });
      it("should not register the user", async () => {
        const response = await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "register",
          method: "post",
          service: "auth",
          data: {
            username: "",
            password: "",
          },
        })
          .onReceive.then((response) => {
            expect(response.status).toBe(422);
          })
          .catch((err) => console.log(err));
      });
    });

    describe("Given the input is valid for username and password", () => {
      beforeEach(async () => {
        await provider.addInteraction({
          state: "the service is up",
          uponReceiving: "username and password are valid",
          withRequest: {
            path: `/register`,
            method: "POST",
            body: {
              username: "Eyesofbanquo",
              password: "20400112",
            },
          },
          willRespondWith: {
            body: {
              success: Matchers.like(true),
            },
            status: 422,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        });
      });

      it("should not register the user", async () => {
        const response = await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "register",
          method: "post",
          service: "auth",
          data: {
            username: "Eyesofbanquo",
            password: "20400112",
          },
        })
          .onReceive.then((response) => {
            expect(response.status).toBe(200);
          })
          .catch((err) => console.log(err));
      });
    });
  });
});
