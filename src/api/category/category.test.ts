// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import pool from "../../database/pool";
import { v4 as uuidv4 } from "uuid";
import { expectation } from "sinon";

chai.use(require("chai-http"));
var should = chai.should();

const categories = require("../../stubs/categories.json");
const TABLE = "category_test";
describe("Category", () => {
  beforeEach(async () => {
    await pool
      .query(
        `CREATE TABLE IF NOT EXISTS ${TABLE}
    (id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    inReview BOOLEAN NOT NULL,
    UNIQUE(name)
    )`
      )
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
        .query(
          `INSERT INTO ${TABLE}
      (id, name, inReview)
      VALUES ('${uuidv4()}', 'Nightmare', false) ON CONFLICT (name) DO NOTHING RETURNING *`
        )
        .catch((err) => {
          console.log("called");
          console.log(err);
        });
    });
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

  describe("/POST categories", () => {
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
          expect(response.status).to.eql(200);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
    it(`should not POST a category named "Ha" if it already exists`, (done) => {
      pool
        .query(
          `INSERT INTO ${TABLE} (id, name, inReview) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING RETURNING *`,
          [uuidv4(), "Ha", true]
        )
        .catch((err) => console.log(err));
      const controller = new AppController();
      // Act:
      chai
        .request(controller.app)
        .post("/api/categories")
        .send({ name: "Ha" })
        .then((response) => {
          // Assert
          expect(response.status).to.eql(304);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("/DELETE categories", () => {
    it(`should DELETE an existing category named "Him"`, (done) => {
      const uuid = uuidv4();
      pool
        .query(
          `INSERT INTO ${TABLE} (id, name, inReview) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING RETURNING *`,
          [uuid, "Him", true]
        )
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
});
