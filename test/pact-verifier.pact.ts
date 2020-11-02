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
      providerBaseUrl: `http://localhost:5000`,
      pactUrls: pacts,
      logLevel: "debug",
      enablePending: true,
      stateHandlers: {
        "there are categories": async () => {
          await pool
            .query(createCategoriesTable({ table: CATEGORIES_TABLE }))
            .catch();
          await pool
            .query(createCategory({ table: CATEGORIES_TABLE }), [
              uuidv4(),
              "Random name",
              true,
            ])
            .catch();
          return Promise.resolve("Categories added to database");
        },
        "The category Night already exists": async () => {
          await pool
            .query(createCategoriesTable({ table: CATEGORIES_TABLE }))
            .catch();
          await pool
            .query(createCategory({ table: CATEGORIES_TABLE }), [
              uuidv4(),
              "Night",
              true,
            ])
            .catch();
          return Promise.resolve("Categories added to database");
        },
        "Category id d2f97165-54ca-4bd1-b173-ae994059c64a exists": async () => {
          await pool
            .query(createCategory({ table: CATEGORIES_TABLE }), [
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

    return await new Verifier(opts).verifyProvider().finally(() => {});
    console.log("Pact Verification Complete!");
  });
});
