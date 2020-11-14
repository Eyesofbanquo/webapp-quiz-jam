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
  before(() => {
    cy.task("set:env");
  });
  describe("Creation: Success", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/create-quiz");
    });

    afterEach(() => {
      cy.task("destroy:db");
    });
    it("can create a normal question with all answer choices", () => {
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
      cy.get("#question-name-textfield").type("A Question");

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

      cy.get("#post-status-alert").should("be.visible");
    });
  });

  describe("Creation: Fail", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.task("add-question:db");
      cy.visit("/create-quiz");
    });

    afterEach(() => {
      cy.task("destroy:db");
    });
    it("can not create a normal question that already exists", () => {
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
      cy.get("#question-name-textfield").type("Cypress Question");

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

      cy.get("#warning-alert").should("be.visible");
      cy.get("#warning-alert").should(
        "have.text",
        "This question already exists"
      );
    });
  });

  describe("Creation: Fail: No Answers Selected", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/create-quiz");
    });

    afterEach(() => {
      cy.task("destroy:db");
    });

    it("should not create question", () => {
      cy.get("#choice-form-submit-button").click();
      cy.get("#warning-alert").should("be.visible");
      cy.get("#warning-alert").should(
        "have.text",
        "You must correctly fill out all fields to move on."
      );
    });
  });

  describe("Creation: Fail: No Correct Answers Created", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/create-quiz");
    });

    afterEach(() => {
      cy.task("destroy:db");
    });

    it("should not create question", () => {
      cy.get('*[data-correct="incorrect"]').each(($value, index) =>
        cy.wrap($value).type(`incorrect answer ${index}`)
      );

      cy.get("#choice-form-submit-button").click();

      cy.get("#warning-alert").should("be.visible");
      cy.get("#warning-alert").should(
        "have.text",
        "You must correctly fill out all fields to move on."
      );
    });
  });
});
