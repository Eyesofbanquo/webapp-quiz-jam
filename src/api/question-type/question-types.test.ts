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
  QUESTION_TYPE_TABLE_TEST,
} from "./queries";
import { QUESTION_TYPE_GENERIC_ENDPOINT } from "./routes";
import { QuestionTypeResponse } from "./helper";

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
});
