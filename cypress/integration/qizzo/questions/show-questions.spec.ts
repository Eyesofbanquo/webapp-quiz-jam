/// <reference types="cypress" />

describe("Show Questions Screen", () => {
  context("From Creator Menu", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/creator");
    });
    afterEach(() => {
      cy.task("destroy:db");
    });
    context("When questions exist", () => {
      beforeEach(() => {
        cy.task("add-question:db");
      });
      it("should show questions", () => {
        // Press show questions button
        cy.get("#show-questions-button").click();

        // Make sure there are visible rows
        cy.get("*[data-row]").each(($value, index) =>
          cy.wrap($value).should("be.visible")
        );
      });
    });

    context("When questions do not exist", () => {
      it("should show no content view", () => {
        cy.get("#show-questions-button").click();

        cy.get("#no-content-view").should("be.visible");
      });
    });
  });

  context("From within questions screen", () => {
    afterEach(() => {
      cy.task("destroy:db");
    });
    context("When questions exist", () => {
      beforeEach(() => {
        cy.task("create:db");
        cy.task("add-question:db");
        cy.visit("/questions");
      });

      it("should display delete screen on click", () => {
        cy.get("*[data-row]").should("have.length.greaterThan", 0);
        cy.get("*[data-row]").eq(0).click();
        cy.get("#delete-content-screen").should("be.visible");
        cy.get("[data-delete-button]").should("be.visible");
      });

      context("when deleting a question", () => {
        it("should show no content screen", () => {
          cy.get("*[data-row]").should("have.length.greaterThan", 0);

          cy.get("*[data-row]").eq(0).click();

          cy.get("#delete-content-screen").should("be.visible");

          cy.get("[data-delete-button]").should("be.visible");

          cy.get("[data-delete-button]").click();

          cy.get("#no-content-view").should("be.visible");
        });
      });
    });
  });
});
