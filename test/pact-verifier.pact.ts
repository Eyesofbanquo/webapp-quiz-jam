import "chai-http";
import * as chai from "chai";
import { expect } from "chai";
import { AppController } from "../server";
import "mocha";
import { Verifier, VerifierOptions } from "@pact-foundation/pact";
// const path = require("path");
import * as path from "path";
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
  getQuestionTypeTable,
} from "../src/api/question-type/queries";
import {
  categoriesExist,
  categoryNightExist,
} from "./handlers/category-handler";
import { questionTypesExist } from "./handlers/question-type-handler";
import { getQuestionTable } from "../src/api/question/queries";
import {
  questionABCExists,
  questionsExist,
  questionsWithNewCategoryAndType,
} from "./handlers/question.handler";

const controller = new AppController();

describe("Pact Verification", () => {
  const port = process.env.PORT || "5000";

  describe("Category Verification", () => {
    let pacts;
    before((done) => {
      glob("./webappjam-pacts/*-?(category)-*.json", (error, files) => {
        pacts = files.map((file) => path.resolve("./", file));
        done();
      });
    });
    after(async () => {
      await pool.query(`DROP TABLE IF EXISTS ${getCategoryTable()}`).catch();
      await pool
        .query(`DROP TABLE IF EXISTS ${getQuestionTypeTable()}`)
        .catch();
      await pool.query(`DROP TABLE IF EXISTS ${getQuestionTable()}`).catch();
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
        },
      };

      await new Verifier(opts).verifyProvider().finally(async () => {});
      console.log("Pact Verification Complete!");
    });
  });

  describe("Question type Verification", () => {
    let pacts;
    before((done) => {
      glob("./webappjam-pacts/*-?(question-type)-*.json", (error, files) => {
        pacts = files.map((file) => path.resolve("./", file));
        done();
      });
    });
    after(async () => {
      await pool.query(`DROP TABLE IF EXISTS ${getCategoryTable()}`).catch();
      await pool
        .query(`DROP TABLE IF EXISTS ${getQuestionTypeTable()}`)
        .catch();
      await pool.query(`DROP TABLE IF EXISTS ${getQuestionTable()}`).catch();
    });

    it("should validate the expectaions of the consumer", async () => {
      const opts: VerifierOptions = {
        provider: "QizzoProvider",
        providerBaseUrl: `http://localhost:5000`,
        pactUrls: pacts,
        logLevel: "debug",
        enablePending: true,
        stateHandlers: {
          "there are question types": questionTypesExist,
        },
      };

      await new Verifier(opts).verifyProvider().finally(async () => {});
      console.log("Pact Verification Complete!");
    });
  });

  describe("Question Verification", () => {
    let pacts;
    before((done) => {
      glob(
        "./webappjam-pacts/*-@(question)-qizzoprovider.json",
        (error, files) => {
          pacts = files.map((file) => path.resolve("./", file));
          console.log(files, "bruh");

          done();
        }
      );
    });
    after(async () => {
      await pool.query(`DROP TABLE IF EXISTS ${getQuestionTable()}`).catch();
      await pool.query(`DROP TABLE IF EXISTS ${getCategoryTable()}`).catch();
      await pool
        .query(`DROP TABLE IF EXISTS ${getQuestionTypeTable()}`)
        .catch();
    });

    it("should validate the expectaions of the consumer", async () => {
      const opts: VerifierOptions = {
        provider: "QizzoProvider",
        providerBaseUrl: `http://localhost:5000`,
        pactUrls: pacts,
        logLevel: "debug",
        enablePending: true,
        stateHandlers: {
          "questions exist": questionsExist,
          "questions exist with new category and question type ids": questionsWithNewCategoryAndType,
          "ABC question exists with new category and question type ids": questionABCExists,
        },
      };

      await new Verifier(opts).verifyProvider().finally(async () => {});
      console.log("Pact Verification Complete!");
    });
  });
});
