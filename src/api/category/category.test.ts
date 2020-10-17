// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import { TestDatabase } from "../../api/testing/TestDatabase";
import { CategorySchema } from "./schema";

chai.use(require("chai-http"));

const testdb = new TestDatabase();

const categories = require("../../stubs/categories.json");
describe("Category", () => {
  describe("/GET categories", () => {
    after(() => {
      testdb
        .realm(CategorySchema)
        .then((realm) => {
          realm.write(() => {
            realm.deleteAll();
          });
          realm.close();
        })
        .catch((error) => console.log(error));
    });
    it("it should GET all the categories", () => {
      /** ! Assume */
      testdb
        .realm(CategorySchema)
        .then((realm) => {
          realm.write(() => {
            realm.create("Category", categories[0]);
          });
          realm.close();
        })
        .catch((error) => console.log(error));

      const controller = new AppController(testdb);

      // Act:
      chai
        .request(controller.app)
        .get("/api/categories")
        .then((response) => {
          // Assert
          expect(response.body[0].id).to.eql("1");
          expect(response.body[0].name).to.eql("Nightmare");
          expect(response.status).to.eql(200);
        });
    });
  });
});
