import "chai-http";
import * as chai from "chai";
import { expect } from "chai";
import "mocha";
import { Verifier, VerifierOptions } from "@pact-foundation/pact";
const path = require("path");
const glob = require("glob");
import pool from "../src/database/pool";
import {
  createCategoriesTable,
  createCategory,
  getCategoryTable,
} from "../src/api/category/queries";
import { v4 as uuidv4 } from "uuid";
import {
  createQuestionType,
  createQuestionTypeTable,
} from "../src/api/question-type/queries";

describe("Question Type Pact Verification", () => {
  let pacts;
  before((done) => {
    glob("./webappjam-pacts/*.json", (error, files) => {
      pacts = files.map((file) => path.resolve("./", file));
      done();
    });
  });

  after(async () => {
    console.log(getCategoryTable());
    await pool.query(`DROP TABLE IF EXISTS ${getCategoryTable()}`).catch();
  });

  it("should validate the question type pacts", async () => {
    const opts: VerifierOptions = {
      provider: "QizzoProvider",
      providerBaseUrl: `http://localhost:5000`,
      pactUrls: pacts,
      logLevel: "debug",
      enablePending: true,
      stateHandlers: {
        "there are question types": async () => {
          await pool.query(createQuestionTypeTable()).catch();
          await pool.query(createQuestionType(), [uuidv4(), "Random"]).catch();
          return Promise.resolve("Question Type added to database");
        },
      },
    };

    await new Verifier(opts).verifyProvider().finally(async () => {});
    console.log("Pact Verification Complete!");
  });
});
