import "chai-http";
import * as chai from "chai";
import { expect } from "chai";
import { AppController } from "../../server";
import "mocha";
import { Verifier, VerifierOptions } from "@pact-foundation/pact";
// const path = require("path");
import * as path from "path";
const glob = require("glob");
import pool from "../database/pool";
import {
  createCategoriesTable,
  createCategory,
  getCategoryTable,
} from "../api/category/queries";
import { v4 as uuidv4 } from "uuid";
import {
  createQuestionType,
  createQuestionTypeTable,
  deleteQuestionType,
  getQuestionTypeTable,
} from "../api/question-type/queries";
import {
  categoriesExist,
  categoryNightExist,
  deleteCategoryWithUUID,
} from "./handlers/category-handler";
import {
  deleteQuestionTypeHandler,
  questionTypesExist,
} from "./handlers/question-type-handler";
import { getQuestionTable } from "../api/question/queries";
import {
  deleteQuestionHandler,
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
          "category with 97dcb062-ffea-4885-baf3-a04ede5b0037 exists": deleteCategoryWithUUID,
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
          "the question type e998c46c-6f0f-4caa-92ad-8f482859938b exists": deleteQuestionTypeHandler,
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
          "question 49fe1601-660e-47b8-9e49-dc001a020540 exists": deleteQuestionHandler,
        },
      };

      await new Verifier(opts).verifyProvider().finally(async () => {});
      console.log("Pact Verification Complete!");
    });
  });

  describe("Difficulty Verification", () => {
    let pacts;
    before((done) => {
      glob("./webappjam-pacts/*-@(difficulty)-*.json", (error, files) => {
        pacts = files.map((file) => path.resolve("./", file));
        console.log(files, "bruh");

        done();
      });
    });

    it("should validate the expectations of the consumer", async () => {
      const opts: VerifierOptions = {
        provider: "QizzoProvider",
        providerBaseUrl: `http://localhost:5000`,
        pactUrls: pacts,
        logLevel: "info",
        enablePending: true,
        stateHandlers: {
          "Difficulty exists": async () => {
            return Promise.resolve("Difficulty is loaded already");
          },
        },
      };

      await new Verifier(opts).verifyProvider().finally(async () => {});
      console.log("Pact Verification Complete!");
    });
  });
});
