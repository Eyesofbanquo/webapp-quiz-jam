/// <reference types="cypress" />

describe("Login tests", () => {
  before(() => {
    cy.task("set:env");
  });

  describe("Login Page", () => {
    beforeEach(() => {
      cy.task("create:db");
      cy.visit("/login");
    });

    afterEach(() => {
      cy.task("destroy:db");
    });

    context("Given a signup button exists", () => {
      it("should take you to the signup form", () => {
        cy.get("#login-screen-signup-button").should("exist");
        cy.get("#login-screen-signup-button").should("have.text", "Sign up");

        cy.get("#login-screen-signup-button").click();

        cy.url().should("include", "/login/signup");
      });
    });

    context("Given a login button exists", () => {
      it("should take you to the login form", () => {
        cy.get("#login-screen-login-button").should("exist");
        cy.get("#login-screen-login-button").should("have.text", "Login");

        cy.get("#login-screen-login-button").click();

        cy.url().should("include", "/login/auth");
      });
    });
  });

  describe("Logging in", () => {
    beforeEach(() => {
      cy.server();
      cy.fixture("login/login_success.json").then((results) => {
        cy.route({
          method: "POST",
          url: `https://warm-meadow-59872.herokuapp.com/login`,
          response: results,
        }).as("loginSuccess");
      });
      cy.visit("/login/auth");
    });

    it("should return a logged in user", () => {
      cy.get("#login-auth-login-button").click();
      cy.wait("@loginSuccess");
      cy.url().should("include", "/creator");
    });
  });
});
