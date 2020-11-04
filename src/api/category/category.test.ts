// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import pool from "../../database/pool";
import { v4 as uuidv4 } from "uuid";
import { expectation } from "sinon";
import { createCategoriesTable, createCategory } from "./queries";

chai.use(require("chai-http"));
var should = chai.should();

const categories = require("../../stubs/categories.json");
describe("Category", () => {
  beforeEach(async () => {
    await pool
      .query(createCategoriesTable())
      .then((res) => console.log(""))
      .catch((err) => console.log(err));
  });

  afterEach(async () => {
    await pool
      .query("DROP TABLE IF EXISTS category_test")
      .catch((err) => console.log(err));
  });
  describe("/GET categories", () => {
    beforeEach(async () => {
      await pool
        .query(createCategory(), [uuidv4(), "Nightmare", false, false])
        .catch((err) => {
          console.log("called");
          console.log(err);
        });
    });

    describe("On Success: STATUS 200", () => {
      it("should GET all the categories", (done) => {
        /** ! Assume */

        const controller = new AppController();

        // Act:
        chai
          .request(controller.app)
          .get("/api/categories")
          .then((response) => {
            // Assert
            expect(response.body.data[0].name).to.eql("Nightmare");
            expect(response.status).to.eql(200);
            done();
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      });
    });
  });

  describe("/POST categories", () => {
    describe("On Success: STATUS 201", () => {
      it(`should POST a new category named "Ha"`, (done) => {
        const controller = new AppController();
        // Act:
        chai
          .request(controller.app)
          .post("/api/categories")
          .send({ name: "Ha" })
          .then((response) => {
            // Assert

            expect(response.body.success).to.eql(true);
            expect(response.body.data.name).to.eql("Ha");
            expect(response.status).to.eql(201);
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
    });

    describe("On Failure: STATUS 200", () => {
      it(`should not POST a category named "Ha" if it already exists`, (done) => {
        pool
          .query(createCategory(), [uuidv4(), "Ha", true, false])
          .catch((err) => console.log(err));
        const controller = new AppController();
        // Act:
        chai
          .request(controller.app)
          .post("/api/categories")
          .send({ name: "Ha" })
          .then((response) => {
            // Assert
            expect(response.body.success).to.eql(false);
            expect(response.status).to.eql(200);
            expect(response.body.data).to.equal(null);
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
    });
  });

  describe("/DELETE categories", () => {
    describe("On Success: STATUS 200", () => {
      it(`should DELETE an existing category named "Him"`, (done) => {
        const uuid = uuidv4();
        pool
          .query(createCategory(), [uuid, "Him", true, false])
          .catch((err) => console.log(err));

        const controller = new AppController();
        // Act:
        chai
          .request(controller.app)
          .delete("/api/categories")
          .send({ id: uuid })
          .then((response) => {
            // Assert
            expect(response.body.success).to.eql(true);
            expect(response.body.data.name).to.eql("Him");
            expect(response.status).to.eql(200);
            done();
          })
          .catch((error) => {
            console.log(error);
            done(error);
          });
      });
    });

    describe("On Failure: STATUS 200 - Return null", () => {
      it(`should DELETE an existing category named "Him"`, (done) => {
        const uuid = uuidv4();

        const controller = new AppController();
        // Act:
        chai
          .request(controller.app)
          .delete("/api/categories")
          .send({ id: uuid })
          .then((response) => {
            // Assert
            expect(response.body.success).to.eql(false);
            expect(response.body.data).to.eql(null);
            expect(response.status).to.eql(200);
            done();
          })
          .catch((error) => {
            console.log(error);
            done(error);
          });
      });
    });
  });
});
