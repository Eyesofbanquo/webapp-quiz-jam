import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import pool from "../../database/pool";
import { v4 as uuidv4 } from "uuid";
import { expectation } from "sinon";
import { createQuestion } from "./queries";

const TABLE = "questions_test";
describe("Question Tests", () => {
  let categoryUUID;
  let questionTypeUUID;
  before(async () => {
    categoryUUID = uuidv4();
    questionTypeUUID = uuidv4();
    await pool
      .query(
        `CREATE TABLE IF NOT EXISTS category_test
    (id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    inReview BOOLEAN NOT NULL,
    UNIQUE(name)
    )`
      )
      .then((res) => console.log(""))
      .catch((err) => console.log(err));

    await pool
      .query(
        `CREATE TABLE IF NOT EXISTS question_type_test
    (id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    UNIQUE(name)
    )`
      )
      .then((res) => console.log(""))
      .catch((err) => console.log(err));

    pool
      .query(
        `INSERT INTO category_test (id, name, inReview) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING RETURNING *`,
        [categoryUUID, "Ha", true]
      )
      .catch((err) => console.log(err));

    pool
      .query(
        `INSERT INTO question_type_test (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING RETURNING *`,
        [questionTypeUUID, "Multiple Choice"]
      )
      .catch((err) => console.log(err));
  });

  after(async () => {
    await pool
      .query(`DROP TABLE IF EXISTS category_test`)
      .catch((err) => console.log(err));
    await pool
      .query(`DROP TABLE IF EXISTS question_type_test`)
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    await pool
      .query(
        `CREATE TABLE IF NOT EXISTS ${TABLE}
        (id UUID PRIMARY KEY,
          name TEXT NOT NULL,
          inReview BOOLEAN NOT NULL,
          correctAnswers TEXT ARRAY NOT NULL,
          incorrectAnswers TEXT ARRAY NOT NULL,
          category_uid UUID REFERENCES category_test(id),
          question_type_uid UUID REFERENCES question_type_test(id),
          UNIQUE(name)
          )`
      )
      .catch((err) => console.log(err));
  });

  afterEach(async () => {
    await pool
      .query(`DROP TABLE IF EXISTS ${TABLE}`)
      .catch((err) => console.log(err));
  });

  describe("/GET", () => {
    it("should GET all questions", (done) => {
      /** ! Assume */
      const uuid = uuidv4();
      pool
        .query(createQuestion({ table: TABLE }), [
          uuid,
          "Nightmare",
          true,
          ["1"],
          ["2", "3", "4"],
          categoryUUID,
          questionTypeUUID,
        ])
        .catch((err) => {
          console.log(err);
        });

      const controller = new AppController();

      chai
        .request(controller.app)
        .get("/api/questions")
        .then((response) => {
          expect(response.status).to.eql(200);
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  describe("/POST", () => {
    it("should post a new question if it doesn't exist already", (done) => {
      const controller = new AppController();

      const question = {
        name: "NightmareQuestion",
        correctAnswers: ["1"],
        incorrectAnswers: ["2", "3", "4"],
        categoryId: categoryUUID,
        questionTypeId: questionTypeUUID,
      };

      chai
        .request(controller.app)
        .post("/api/questions")
        .send(question)
        .then((response) => {
          expect(response.status).to.eql(201);
          expect(response.body.data.name).to.eql("NightmareQuestion");
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });

    it("should NOT post a new question if it already exists", (done) => {
      const controller = new AppController();

      const uuid = uuidv4();

      const question = {
        name: "NightmareQuestion",
        correctAnswers: ["1"],
        incorrectAnswers: ["2", "3", "4"],
        categoryId: categoryUUID,
        questionTypeId: questionTypeUUID,
      };

      pool
        .query(
          `INSERT INTO ${TABLE} (id, name, inReview, correctAnswers, incorrectAnswers, category_uid, question_type_uid) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            uuid,
            question.name,
            true,
            question.correctAnswers,
            question.incorrectAnswers,
            categoryUUID,
            questionTypeUUID,
          ]
        )
        .catch();

      chai
        .request(controller.app)
        .post("/api/questions")
        .send(question)
        .then((response) => {
          expect(response.status).to.eql(304);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("/DELETE", () => {
    it(`should delete an entry from the database if it exists`, (done) => {
      const controller = new AppController();

      const uuid = uuidv4();

      const question = {
        name: "NightmareQuestion",
        correctAnswers: ["1"],
        incorrectAnswers: ["2", "3", "4"],
        categoryId: categoryUUID,
        questionTypeId: questionTypeUUID,
      };

      pool
        .query(
          `INSERT INTO ${TABLE} (id, name, inReview, correctAnswers, incorrectAnswers, category_uid, question_type_uid) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            uuid,
            question.name,
            true,
            question.correctAnswers,
            question.incorrectAnswers,
            categoryUUID,
            questionTypeUUID,
          ]
        )
        .catch();

      chai
        .request(controller.app)
        .delete("/api/questions")
        .send({ id: uuid })
        .then((response) => {
          expect(response.status).to.eql(200);
          expect(response.body.success).to.eql(true);
          expect(response.body.data.name).to.eql(question.name);
          done();
        })
        .catch((err) => done(err));
    });

    it(`should return a NOT FOUND if the entry doesn't exist`, (done) => {
      const controller = new AppController();

      chai
        .request(controller.app)
        .delete("/api/questions")
        .send({ id: uuidv4() })
        .then((response) => {
          expect(response.status).to.eql(404);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
