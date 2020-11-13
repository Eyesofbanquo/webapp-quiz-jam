// import "cypress";
// import "chai";
// import * as chai from "chai";
// import "chai-http";

// chai.use(require("chai-http"));

/// <reference types="cypress" />

import "pg";
import { v4 as uuid } from "uuid";
import { setupCypressTables, dropTables } from "../../../src/database/pool";
import {
  createQuestion,
  createQuestionTable,
  deleteQuestion,
} from "../../../src/api/question/queries";
import { createCategory } from "api/category/queries";
describe("Multiple Choice Form test", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("categories/categories.json").then((data) => {
      console.log(data);
      cy.route({
        method: "GET",
        url: "/api/categories",
        response: data,
      }).as("categories");
    });

    cy.fixture("question-types/question-types.json").then((data) => {
      cy.route({
        method: "GET",
        url: "/api/question-types",
        response: data,
      }).as("types");
    });

    cy.fixture("difficulty/difficulty.json").then((data) => {
      cy.route({
        method: "GET",
        url: "/api/difficulty",
        response: data,
      }).as("difficulty");
    });
  });
  describe("Creation: Success", () => {
    beforeEach(() => {
      cy.fixture("questions/post-question.json").then((data) => {
        cy.route({
          method: "POST",
          url: "/api/questions",
          response: data,
        }).as("question-response");
      });

      cy.visit("/create-quiz");
    });
    it("can create a normal question", () => {
      cy.wait("@categories");
      cy.wait("@difficulty");
      cy.wait("@types");

      cy.get("#choose-category-menu .MuiListItemText-primary").should(
        "have.text",
        "Choose a category"
      );
      cy.get("#choose-category-menu").click();
      cy.get("#choose-category-submenu").should("be.visible");
      cy.get("#choose-category-submenu #0-submenu-item").should("be.visible");
      cy.get("#choose-category-submenu #0-submenu-item").click();

      cy.get("#choose-difficulty-menu .MuiListItemText-primary").should(
        "have.text",
        "Choose a difficulty"
      );
      cy.get("#choose-difficulty-menu").click();
      cy.get("#choose-difficulty-submenu").should("be.visible");
      cy.get("#choose-difficulty-submenu #1-submenu-item").should("be.visible");
      cy.get("#choose-difficulty-submenu #1-submenu-item").click();

      cy.get("#question-name-textfield").should("be.visible");
      cy.get("#question-name-textfield").type("New Question");

      cy.get("#question-answer-choices").should("be.visible");

      // Correct answers should exist
      cy.get('*[data-correct="correct"]').each(($value, index) =>
        cy.wrap($value).should("be.visible")
      );

      /// Add mandatory text to the correct answer boxes
      cy.get('*[data-correct="correct"]').each(($value, index) =>
        cy.wrap($value).type(`answer ${index}`)
      );

      /// Type into incorrect boxes IF they exist
      cy.get('*[data-correct="incorrect"]').each(($value, index) =>
        cy.wrap($value).type(`incorrect answer ${index}`)
      );

      cy.get("#choice-form-submit-button").click();

      cy.wait("@question-response");

      cy.get("#post-status-alert").should("be.visible");
    });
  });

  describe("Creation: Fail", () => {
    beforeEach(() => {
      cy.fixture("questions/post-question-fail.json").then((data) => {
        cy.route({
          method: "POST",
          url: "/api/questions",
          response: data,
        }).as("question-response-fail");
      });

      cy.visit("/create-quiz");
    });
    it("can create a normal question", () => {
      cy.wait("@categories");
      cy.wait("@difficulty");
      cy.wait("@types");

      cy.get("#choose-category-menu .MuiListItemText-primary").should(
        "have.text",
        "Choose a category"
      );
      cy.get("#choose-category-menu").click();
      cy.get("#choose-category-submenu").should("be.visible");
      cy.get("#choose-category-submenu #0-submenu-item").should("be.visible");
      cy.get("#choose-category-submenu #0-submenu-item").click();

      cy.get("#choose-difficulty-menu .MuiListItemText-primary").should(
        "have.text",
        "Choose a difficulty"
      );
      cy.get("#choose-difficulty-menu").click();
      cy.get("#choose-difficulty-submenu").should("be.visible");
      cy.get("#choose-difficulty-submenu #1-submenu-item").should("be.visible");
      cy.get("#choose-difficulty-submenu #1-submenu-item").click();

      cy.get("#question-name-textfield").should("be.visible");
      cy.get("#question-name-textfield").type("New Question");

      cy.get("#question-answer-choices").should("be.visible");

      // Correct answers should exist
      cy.get('*[data-correct="correct"]').each(($value, index) =>
        cy.wrap($value).should("be.visible")
      );

      /// Add mandatory text to the correct answer boxes
      cy.get('*[data-correct="correct"]').each(($value, index) =>
        cy.wrap($value).type(`answer ${index}`)
      );

      /// Type into incorrect boxes IF they exist
      cy.get('*[data-correct="incorrect"]').each(($value, index) =>
        cy.wrap($value).type(`incorrect answer ${index}`)
      );

      cy.get("#choice-form-submit-button").click();

      cy.wait("@question-response-fail");

      cy.get("#warning-alert").should("be.visible");
    });
  });
});
