/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
import pool, {
  dropTables,
  setupCypressTables,
  seedQuestionTypeUUID,
  seedCategoryUUID,
} from "../../src/database/pool";
import { v4 as uuidv4 } from "uuid";
import { createQuestion } from "../../src/api/question/queries";
import { Question } from "../../src/api/question/schema";
import { createCategory } from "api/category/queries";
const dotenvPlugin = require("cypress-dotenv");

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // process.env = null;

  process.env.NODE_ENV;
  on("task", {
    "set:env": async () => {
      process.env.NODE_ENV = "cypress";

      return null;
    },
    "create:db": async () => {
      await setupCypressTables().catch();
      return null;
    },
    "add-question:db": async () => {
      process.env.NODE_ENV = "cypress";
      await createQuestion({
        id: uuidv4(),
        name: "Cypress Question",
        in_review: true,
        correct_answers: ["A"],
        incorrect_answers: ["B", "C", "D"],
        category_uid: seedCategoryUUID,
        question_type_uid: seedQuestionTypeUUID,
        deleted: false,
        difficulty: "normal",
      }).catch();
      return null;
    },
    "add-category:db": async () => {
      process.env.NODE_ENV = "cypress";
      await createCategory({
        id: uuidv4(),
        name: "New",
        in_review: true,
        deleted: false,
      });
      return null;
    },
    "destroy:db": async () => {
      process.env.NODE_ENV = "cypress";
      await dropTables().catch();
      return null;
    },
  });
  config = dotenvPlugin(config);

  return config;
};
