import { Pact } from "@pact-foundation/pact";
const path = require("path");

type PactName =
  | "category"
  | "question"
  | "question-type"
  | "difficulty"
  | "register"
  | "category2";

export const provider = (name: PactName) =>
  new Pact({
    cors: true,
    port: 4000,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "error",
    dir: path.resolve(process.cwd(), "../webappjam-pacts2"),
    spec: 2,
    consumer: `QizzoConsumer-${name}`,
    provider: `QizzoProvider`,
    host: "127.0.0.1",
  });
