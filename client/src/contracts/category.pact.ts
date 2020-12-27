import { Pact, Matchers } from "@pact-foundation/pact";
const { eachLike, like } = require("@pact-foundation/pact").Matchers;

import { makeRequest } from "../networking/network";
import { provider as Provider } from "./setup";

const baseport = {
  base: "127.0.0.1",
  port: "4000",
};

const provider = Provider("category");
describe("Pact with Qizzo API", () => {
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
              in_review: Matchers.like(false),
              deleted: false,
              user: Matchers.like({
                user_id: Matchers.like("6ce02d16-2fb5-4b22-a3ae-f618f198c9c9"),
              }),
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
            data: {
              id: Matchers.like("1"),
              name: "New Nightmare",
              in_review: true,
              deleted: false,
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
        data: {
          name: "New Nightmare",
          user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
        },
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

    it("Should not create a new category", async () => {
      const response = await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "categories",
        method: "post",
        data: {
          name: "Random",
          user_id: "6ce02d16-2fb5-4b22-a3ae-f618f198c9c9",
        },
      }).onReceive.then((response) => {
        const success = response.status;
        expect(success).toEqual(200);
        expect(response.data.success).toEqual(false);
        expect(response.data.data).toEqual(null);
      });
    });
  });

  describe("DELETE", () => {
    describe("ON SUCCESS", () => {
      const uuid = "97dcb062-ffea-4885-baf3-a04ede5b0037";

      beforeEach(async () => {
        await provider.addInteraction({
          state: "category with 97dcb062-ffea-4885-baf3-a04ede5b0037 exists",
          uponReceiving: "a request to delete a category",
          withRequest: {
            path: "/api/categories/97dcb062-ffea-4885-baf3-a04ede5b0037",
            method: "DELETE",
          },
          willRespondWith: {
            status: 200,
            body: {
              success: true,
              data: {
                id: "97dcb062-ffea-4885-baf3-a04ede5b0037",
                name: Matchers.somethingLike("aye"),
                in_review: Matchers.somethingLike(true),
                deleted: true,
              },
            },
          },
        });
      });

      it("Should delete a category", async () => {
        const response = await makeRequest({
          base: "127.0.0.1",
          port: "4000",
          endpoint: "categories",
          method: "delete",
          data: { id: "97dcb062-ffea-4885-baf3-a04ede5b0037" },
        }).onReceive.then((response) => {
          const status = response.status;
          expect(status).toEqual(200);
          expect(response.data.success).toEqual(true);
          expect(response.data.data.id).toEqual(
            "97dcb062-ffea-4885-baf3-a04ede5b0037"
          );
          expect(response.data.data.deleted).toEqual(true);
        });
      });
    });
  });
});
