/// <reference types="cypress" />

describe("Create Category", () => {
  beforeEach(() => {
    cy.task("create:db");
    cy.visit("/create-category");
  });
  afterEach(() => {
    cy.task("destroy:db");
  });

  context("Given the category does not already exist", () => {
    it("should create a category when given a text string", () => {
      cy.get("#category-input-field").type("New");

      cy.get("#create-category-submit-button").click();

      cy.get("[data-alert-type=success]").should("be.visible");
    });
  });

  context("Given the category already exists", () => {
    beforeEach(() => {
      cy.task("add-category:db");
    });

    it("should not create a category", () => {
      cy.get("#category-input-field").type("New");

      cy.get("#create-category-submit-button").click();

      cy.get("[data-alert-type=error]").should("be.visible");
    });
  });

  context("When a category is created", () => {
    it("Should show in on the all categories screen", () => {
      cy.get("#category-input-field").type("New");

      cy.get("#create-category-submit-button").click();

      cy.get("#go-to-show-categories").click();

      cy.get("[data-row]").should("have.length.greaterThan", 0);
    });
  });

  it("Should not create a category without text", () => {
    cy.get("#create-category-submit-button").click();

    cy.get("[data-alert-type=error]").should("be.visible");
  });
});
