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

  it("Should not create a category without text", () => {
    cy.get("#create-category-submit-button").click();

    cy.get("[data-alert-type=error]").should("be.visible");
  });
});
