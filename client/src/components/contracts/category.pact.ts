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
          expect(name).toEqual("Night");
        })
        .catch((err) => console.log(err));
    });
  });
  describe("Creating a category that already exists", () => {
    beforeEach(async () => {
      await provider.addInteraction({
        state: "The category Night already exists",
        uponReceiving: "a request to create a category named Night",
        withRequest: {
          path: "/api/categories",
          method: "POST",
          body: {
            name: "Night",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
        },
      });
    });
    it("will return a 200", async () => {
      const response = await makeRequest({
        base: "127.0.0.1",
        port: "4000",
        endpoint: "categories",
        method: "post",
        data: {
          name: "Night",
        },
      })
        .onReceive.then((response) => {
          const name = response.data.data[0].name;
          expect(name).toEqual("Night");
        })
        .catch((err) => console.log(err));
    });
  });

  describe("Creating a new category", () => {
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
        console.log(response.data);
        expect(success).toEqual(201);
      });
    });
  });
  // describe("Deleting a categoroy", () => {
  //   beforeEach(async () => {
  //     await provider.addInteraction({
  //       state: "Category id d2f97165-54ca-4bd1-b173-ae994059c64a exists",
  //       uponReceiving: "A request to delete a certain category",
  //       withRequest: {
  //         path: "/api/categories",
  //         method: "DELETE",
  //         body: {
  //           id: "d2f97165-54ca-4bd1-b173-ae994059c64a",
  //         },
  //       },
  //       willRespondWith: {
  //         status: 200,
  //         body: {
  //           success: true,
  //           data: {
  //             id: "d2f97165-54ca-4bd1-b173-ae994059c64a",
  //             name: "Random new category",
  //             inreview: true,
  //           },
  //         },
  //       },
  //     });
  //   });

  //   it("should delete a category", async () => {
  //     const response = await makeRequest({
  //       base: "127.0.0.1",
  //       port: "4000",
  //       endpoint: "categories",
  //       method: "delete",
  //       data: { id: "d2f97165-54ca-4bd1-b173-ae994059c64a" },
  //     }).onReceive.then((response) => {
  //       const id = response.data.data.id;
  //       expect(id).toEqual("d2f97165-54ca-4bd1-b173-ae994059c64a");
  //     });
  //   });
  // });
});
