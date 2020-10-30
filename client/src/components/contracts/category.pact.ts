import { Done } from "@material-ui/icons";
import { Pact } from "@pact-foundation/pact";
const { eachLike } = require("@pact-foundation/pact").Matchers;

import * as path from "path";
import { makeRequest } from "../../networking/network";
import { provider } from "./setup";
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
          status: true,
          data: eachLike({
            id: "1",
            name: "Night",
            inReview: false,
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
