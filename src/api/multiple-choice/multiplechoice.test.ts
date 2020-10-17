// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { app } from "../../../server";
import { expect } from "chai";
// const sinon = require("sinon");
import * as sinon from "ts-sinon";
// const Database = require("../../database/database");
import * as Database from "../../database/database";
import * as Realm from "realm";
import { MultipleChoiceSchema } from "./schema";

chai.use(require("chai-http"));

describe("Multiple Choice", () => {
  beforeEach(() => {
    const db = new Database.Database();
    const stub = sinon.stubObject<Database.Database>(db);
    stub.realm.returns(
      Promise.resolve(
        Realm.open({
          path: "test.realm",
          inMemory: true,
          schema: [MultipleChoiceSchema],
        })
      )
    );
  });
  describe("/GET", () => {
    it("it should GET all the multiple choice", () => {
      chai
        .request(app)
        .get("/api/categories")
        .then((response) => {
          expect(response.status).to.eql(200);
        });
    });
  });
});
