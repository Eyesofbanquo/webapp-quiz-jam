import "chai-http";
import * as chai from "chai";
import { expect } from "chai";
import { AppController } from "../server";
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
import {
  categoriesExist,
  categoryNightExist,
} from "./handlers/category-handler";
import { questionTypesExist } from "./handlers/question-type-handler";

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

  after(async () => {
    console.log(getCategoryTable());
    await pool.query(`DROP TABLE IF EXISTS ${getCategoryTable()}`).catch();
  });

  it("should validate the expectaions of the consumer", async () => {
    const opts: VerifierOptions = {
      provider: "QizzoProvider",
      providerBaseUrl: `http://localhost:5000`,
      pactUrls: pacts,
      logLevel: "debug",
      enablePending: true,
      stateHandlers: {
        "there are categories": categoriesExist,
        "The category Night already exists": categoryNightExist,
        "there are question types": questionTypesExist,
        "Category id d2f97165-54ca-4bd1-b173-ae994059c64a exists": async () => {
          await pool.query(createCategoriesTable()).catch();
          await pool
            .query(createCategory(), [
              "d2f97165-54ca-4bd1-b173-ae994059c64a",
              "Random new category",
              true,
            ])
            .catch();
          return Promise.resolve(
            "Category id d2f97165-54ca-4bd1-b173-ae994059c64a has been created"
          );
        },
      },
    };

    await new Verifier(opts).verifyProvider().finally(async () => {});
    console.log("Pact Verification Complete!");
  });
});
