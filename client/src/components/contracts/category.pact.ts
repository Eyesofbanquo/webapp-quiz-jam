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
describe("Pact with Qizzo API", () => {
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

  describe("Getting all categories", () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: "there are categories",
        uponReceiving: "a request for categories",
        withRequest: {
          path: "/api/categories",
          method: "GET",
        },
        willRespondWith: {
          body: {
            success: Matchers.like(true),
            data: Matchers.eachLike({
              id: "1",
              name: "Night",
              inreview: Matchers.like(false),
            }),
          },
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      });
    });

    it("will receive the list of category objects", async () => {
      const response = await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "categories",
        method: "get",
      })
        .onReceive.then((response) => {
          const name = response.data.data[0].name;
          expect(response.status).toEqual(200);
          expect(name).toEqual("Night");
        })
        .catch((err) => console.log(err));
    });
  });

  describe("POST: On Success", () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: "there are categories",
        uponReceiving: "a request to create a new category",
        withRequest: {
          path: "/api/categories",
          method: "POST",
          body: {
            name: "New Nightmare",
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
              id: Matchers.like("1"),
              name: "New Nightmare",
              inreview: true,
            },
          },
        },
      });
    });

    it("should create a new category", async () => {
      const response = await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "categories",
        method: "post",
        data: { name: "New Nightmare" },
      }).onReceive.then((response) => {
        const success = response.status;
        expect(success).toEqual(201);
        expect(response.data.data.name).toBe("New Nightmare");
      });
    });
  });

  describe("POST: On Failure: Category Exists", () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: "there are categories",
        uponReceiving: "a request to create a category that already exists",
        withRequest: {
          path: "/api/categories",
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
      });
    });

    it("Should not create a new category", async () => {
      const response = await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "categories",
        method: "post",
        data: { name: "Random" },
      }).onReceive.then((response) => {
        const success = response.status;
        expect(success).toEqual(200);
        expect(response.data.success).toEqual(false);
        expect(response.data.data).toEqual(null);
      });
    });
  });
});
