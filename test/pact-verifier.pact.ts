import "chai-http";
import * as chai from "chai";
import { expect } from "chai";
import "mocha";
import { AppController } from "../server";
import { Pact, Verifier, VerifierOptions } from "@pact-foundation/pact";
const path = require("path");
const glob = require("glob");

const controller = new AppController();

describe("Pact Verification", () => {
  let pacts;

  const port = process.env.PORT || "5000";

  before((done) => {
    glob("./webappjam-pacts/*.json", (error, files) => {
      pacts = files.map((file) => path.resolve("./", file));
      done();
    });
  });

  it("should validate the expectaions of the consumer", async () => {
    const opts: VerifierOptions = {
      provider: "QizzoProvider",
      providerBaseUrl: `http://localhost:${port}`,

      pactUrls: pacts,
    };

    await new Verifier(opts)
      .verifyProvider()
      .then((result) => {
        // result.then(() => console.log("yes")).catch();
        console.log("Passed");
      })
      .catch((err) => {
        // expect(err).to.eql(undefined);
        expect.fail(err);
      });
    console.log("Pact Verification Complete!");
  });
});
