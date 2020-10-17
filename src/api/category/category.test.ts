// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
// const sinon = require("sinon");
import * as sinon from "ts-sinon";
// const Database = require("../../database/database");
import * as Database from "../../database/database";
import * as Realm from "realm";
import { CategorySchema } from "./schema";

chai.use(require("chai-http"));

describe("Category", () => {
  beforeEach(async () => {
    const db = new Database.Database();
    const stub = sinon.stubObject<Database.Database>(db);

    stub.realm.returns(
      Promise.resolve(
        Realm.open({
          path: "test.realm",
          inMemory: true,
          schema: [CategorySchema],
        })
      )
    );
  });

  describe("/GET", () => {
    it("it should GET all the categories", () => {
      const db = new Database.Database();
      const stub = sinon.stubObject<Database.Database>(db);
      const controller = new AppController();

      stub.realm.returns(
        Promise.resolve(
          Realm.open({
            path: "test.realm",
            inMemory: true,
            schema: [CategorySchema],
          })
        )
      );
      chai
        .request(controller.app)
        .get("/api/categories")
        .then((response) => {
          console.log(response.body);
          expect(response.status).to.eql(200);
        });
    });
  });
});
