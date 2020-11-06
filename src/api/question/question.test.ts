import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import pool from "../../database/pool";
import { v4 as uuidv4 } from "uuid";
import { expectation } from "sinon";
import { createQuestion, createQuestionTable } from "./queries";
import {
  createQuestionType,
  createQuestionTypeTable,
} from "../../api/question-type/queries";
import {
  createCategoriesTable,
  createCategory,
} from "../../api/category/queries";

const TABLE = "questions_test";
describe("Question Tests", () => {
  let categoryUUID;
  let questionTypeUUID;
  before(async () => {
    categoryUUID = uuidv4();
    questionTypeUUID = uuidv4();

    await pool
      .query(createCategoriesTable())
      .then((res) => console.log(""))
      .catch((err) => console.log(err));

    await pool
      .query(createQuestionTypeTable())
      .then((res) => console.log(""))
      .catch((err) => console.log(err));

    await createCategory({
      id: categoryUUID,
      name: "Ha",
      in_review: true,
      deleted: false,
    }).catch((err) => console.log(err));

    await createQuestionType({
      id: questionTypeUUID,
      name: "Multiple Choice",
      deleted: false,
    }).catch((err) => console.log(err));
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
    await pool.query(createQuestionTable()).catch((err) => console.log(err));
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
      createQuestion({
        id: uuid,
        name: "Nightmare",
        in_review: true,
        correct_answers: ["1"],
        incorrect_answers: ["2", "3", "4"],
        category_uid: categoryUUID,
        question_type_uid: questionTypeUUID,
        deleted: false,
        difficulty: "normal",
      }).catch((err) => {
        expect(err).to.eql(null);
        done();
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
          expect(err).to.eql(null);
          done();
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
          expect(err).to.eql(null);
          done();
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

      createQuestion({
        id: uuid,
        name: question.name,
        in_review: true,
        correct_answers: question.correctAnswers,
        incorrect_answers: question.incorrectAnswers,
        category_uid: categoryUUID,
        question_type_uid: questionTypeUUID,
        deleted: false,
        difficulty: "normal",
      }).catch((err) => {
        expect(err).to.eql(null);
        done();
      });

      chai
        .request(controller.app)
        .post("/api/questions")
        .send(question)
        .then((response) => {
          expect(response.status).to.eql(200);
          expect(response.body.data).to.eql(null);
          done();
        })
        .catch((err) => {
          expect(err).to.eql(null);
          done();
        });
    });
  });

  describe("/DELETE", () => {
    describe("if entry already exists", () => {
      const uuid = uuidv4();
      const question = {
        name: "NightmareQuestion",
        correctAnswers: ["1"],
        incorrectAnswers: ["2", "3", "4"],
        categoryId: categoryUUID,
        questionTypeId: questionTypeUUID,
      };

      beforeEach(async () => {
        await createQuestion({
          id: uuid,
          name: question.name,
          in_review: true,
          correct_answers: question.correctAnswers,
          incorrect_answers: question.incorrectAnswers,
          category_uid: categoryUUID,
          question_type_uid: questionTypeUUID,
          deleted: false,
          difficulty: "normal",
        }).catch();
      });

      it(`should delete the entry`, (done) => {
        const controller = new AppController();

        chai
          .request(controller.app)
          .delete(`/api/questions/${uuid}`)
          .then((response) => {
            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);
            expect(response.body.data.name).to.eql(question.name);
            done();
          })
          .catch((err) => {
            expect(err).to.eql(null);
            done();
          });
      });
    });

    describe("if the entry does not exist", () => {
      it(`should return null data`, (done) => {
        const controller = new AppController();

        chai
          .request(controller.app)
          .delete(`/api/questions/${uuidv4()}`)
          .then((response) => {
            expect(response.status).to.eql(200);
            expect(response.body.data).to.eql(null);
            done();
          })
          .catch((err) => {
            expect(err).to.eql(null);
            done();
          });
      });
    });
  });
});
