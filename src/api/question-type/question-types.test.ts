import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import pool from "../../database/pool";
import { v4 as uuidv4 } from "uuid";
import { expectation } from "sinon";
import {
  createQuestionType,
  createQuestionTypeTable,
  dropQuestionTypeTable,
  getQuestionTypes,
  QUESTION_TYPE_TABLE_TEST,
} from "./queries";
import { QuestionTypeResponse } from "./helper";

const QUESTION_TYPE_GENERIC_ENDPOINT = "/api/question-types";
const TABLE = QUESTION_TYPE_TABLE_TEST;

describe("Question Type Tests", () => {
  const uuid = uuidv4();
  const name = "matching";

  before(async () => {
    await pool.query(createQuestionTypeTable({ table: TABLE })).catch();
    await pool
      .query(createQuestionType({ table: TABLE }), [uuid, name])
      .catch();
  });

  after(async () => {
    await pool.query(dropQuestionTypeTable({ table: TABLE })).catch();
  });

  describe("/GET", () => {
    it(`should retrieve the type named 'matching'`, (done) => {
      const controller = new AppController();

      chai
        .request(controller.app)
        .get(QUESTION_TYPE_GENERIC_ENDPOINT)
        .then((response) => {
          const check = response.body as QuestionTypeResponse;
          expect(response.status).to.eql(200);
          expect(check.data[0].name).to.eql(name);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("/POST", () => {
    it(`should POST a new question type`, (done) => {
      const typeName = "pairs";
      const controller = new AppController();

      chai
        .request(controller.app)
        .post(QUESTION_TYPE_GENERIC_ENDPOINT)
        .send({ name: typeName })
        .then((response) => {
          const check = response.body as QuestionTypeResponse;
          expect(response.status).to.eql(201);
          expect(response.body.data.name).to.eql(typeName);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it(`should POST a new question type AND save to database`, (done) => {
      const typeName = "pairs_two";
      const controller = new AppController();

      chai
        .request(controller.app)
        .post(QUESTION_TYPE_GENERIC_ENDPOINT)
        .send({ name: typeName })
        .then((response) => {
          const check = response.body as QuestionTypeResponse;
          pool
            .query(getQuestionTypes({ table: TABLE }))
            .then((result) => {
              const allNames = result.rows.map((data) => data.name);
              expect(allNames).to.contain(typeName);
              done();
            })
            .catch();
        })
        .catch((err) => {
          done(err);
        });
    });

    it(`should NOT post the same question type`, (done) => {
      const controller = new AppController();
      pool
        .query(createQuestionType({ table: TABLE }), [uuidv4(), "same"])
        .catch();

      chai
        .request(controller.app)
        .post(QUESTION_TYPE_GENERIC_ENDPOINT)
        .send({ name: "same" })
        .then((response) => {
          expect(response.status).to.eql(304);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("/DELETE", () => {
    it(`should delete question type`, (done) => {
      const uuid = uuidv4();
      const controller = new AppController();
      pool
        .query(createQuestionType({ table: TABLE }), [uuid, "delete-me"])
        .catch();

      chai
        .request(controller.app)
        .delete(QUESTION_TYPE_GENERIC_ENDPOINT)
        .send({ id: uuid })
        .then((response) => {
          expect(response.status).to.eql(200);
          expect(response.body.data.name).to.eql("delete-me");
          done();
        })
        .catch((err) => done(err));
    });

    it(`should delete question and remove from db`, (done) => {
      const uuid = uuidv4();
      const controller = new AppController();
      pool
        .query(createQuestionType({ table: TABLE }), [uuid, "delete-mes"])
        .catch();

      chai
        .request(controller.app)
        .delete(QUESTION_TYPE_GENERIC_ENDPOINT)
        .send({ id: uuid })
        .then((response) => {
          pool.query(getQuestionTypes({ table: TABLE })).then((result) => {
            const allNames = result.rows.map((row) => row.name);
            expect(allNames).to.not.contain("delete-mes");
            done();
          });
        })
        .catch((err) => done(err));
    });
  });
});
