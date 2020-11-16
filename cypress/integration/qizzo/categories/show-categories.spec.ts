/// <reference types="cypress" />

describe("Show Category", () => {
  context("For all scenarios", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/categories");
    });
    afterEach(() => {
      cy.task("destroy:db");
    });
    it("Should always show at least 1 category", () => {
      cy.get("[data-row]").should("have.length.greaterThan", 0);
    });

    it("Should show delete content screen when a category is pressed", () => {
      cy.get("[data-row]").eq(0).click();

      cy.get("#delete-content-screen").should("be.visible");
    });
  });

  context("When only ONE category exists", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/categories");
    });
    afterEach(() => {
      cy.task("destroy:db");
    });
    it("Should show the no content screen", () => {
      cy.get("[data-row]").eq(0).click();

      cy.get("[data-delete-button]").click();

      cy.get("#no-content-view").should("be.visible");
    });
  });

  context("When more than ONE category exists", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.task("add-category:db");

      cy.visit("/categories");
    });
    afterEach(() => {
      cy.task("destroy:db");
    });

    it("Should show one less number of category items", () => {
      cy.get("[data-row]").should("have.length.greaterThan", 0);

      cy.get("[data-row]").eq(0).click();

      cy.get("[data-delete-button]").click();

      cy.get("[data-row]").should("have.length.greaterThan", 0);
    });
  });
});
