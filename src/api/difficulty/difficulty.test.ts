import "chai-http";
import * as chai from "chai";
import "mocha";
import { AppController } from "../../../server";
import { expect } from "chai";

describe("Difficulty Tests", () => {
  it("should return all available difficulties", (done) => {
    const controller = new AppController();

    chai
      .request(controller.app)
      .get("/api/difficulty")
      .then((result) => {
        expect(result.body.data).to.contain("easy");
        expect(result.body.data).to.contain("normal");
        expect(result.body.data).to.contain("hard");

        done();
      })
      .catch((err) => {
        expect(err).to.eql(null);
        done();
      });
  });
});
