// import { expect } from "chai";
import "chai-http";
import * as chai from "chai";
import "mocha";
import { app } from "../../../server";

chai.use(require("chai-http"));

describe("/GET categories", () => {
  it("it should GET all the categories", (done) => {
    chai
      .request(app)
      .get("/api/categories")
      .end((err, res) => {
        console.log(res.body);
        // res.should.have.status(200);
        // res.body.should.be.a("array");
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});
