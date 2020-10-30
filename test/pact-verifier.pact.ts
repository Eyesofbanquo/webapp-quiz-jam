import "chai-http";
import * as chai from "chai";
import { expect } from "chai";
import "mocha";
import { AppController } from "../server";
import { Pact, Verifier, VerifierOptions } from "@pact-foundation/pact";
const path = require("path");
const glob = require("glob");
import pool from "../src/database/pool";
import {
  createCategoriesTable,
  createCategory,
  CATEGORIES_TABLE,
} from "../src/api/category/queries";
import { create } from "ts-node";
import { CATEGORY_TABLE } from "../src/api/category/routes";
import { v4 as uuidv4 } from "uuid";

const controller = new AppController();

describe("Pact Verification", () => {
  let pacts;

  const port = process.env.PORT || "5000";

  before((done) => {
    glob("./webappjam-pacts/*.json", (error, files) => {
      pacts = files.map((file) => path.resolve("./", file));
      done();
    });
  });

  it("should validate the expectaions of the consumer", async () => {
    const opts: VerifierOptions = {
      provider: "QizzoProvider",
      providerBaseUrl: `http://localhost:${port}`,
      pactUrls: pacts,
      stateHandlers: {
        "there are categories": async () => {
          await pool
            .query(createCategoriesTable({ table: CATEGORIES_TABLE }))
            .catch();
          await pool.query(createCategory({ table: CATEGORIES_TABLE }), [
            uuidv4(),
            "Random name",
            true,
          ]);
          return Promise.resolve("Categories added to database");
        },
      },
    };

    await new Verifier(opts)
      .verifyProvider()
      .then((result) => {
        // result.then(() => console.log("yes")).catch();
        console.log("Passed");
      })
      .catch((err) => {
        // expect(err).to.eql(undefined);
        expect.fail(err);
      });
    console.log("Pact Verification Complete!");
  });
});
