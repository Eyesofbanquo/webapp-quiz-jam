// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";
import { TestDatabase } from "../../api/testing/TestDatabase";
import { CategorySchema } from "./schema";

chai.use(require("chai-http"));
var should = chai.should();

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
    it("should GET all the categories", () => {
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

  describe("/POST categories", () => {
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

    it(`should POST a new category named "Ha"`, (done) => {
      const controller = new AppController(testdb);
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
  });

  describe("/DELETE categories", () => {
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

    it(`should DELETE an existing category named "Ha"`, () => {
      testdb
        .realm(CategorySchema)
        .then((realm) => {
          realm.write(() => {
            realm.create("Category", categories[1]);
          });
          realm.close();
        })
        .catch((error) => console.log(error));

      const controller = new AppController(testdb);
      // Act:
      chai
        .request(controller.app)
        .delete("/api/categories")
        .send({ id: "2" })
        .then((response) => {
          // Assert
          expect(response.body.success).to.eql(true);
          expect(response.body.data.name).to.eql("Ha");
          expect(response.status).to.eql(200);
        });
    });
  });
});
