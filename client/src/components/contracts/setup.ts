import { Pact } from "@pact-foundation/pact";
const path = require("path");

export const provider = new Pact({
  cors: true,
  port: 4000,
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  logLevel: "debug",
  dir: path.resolve(process.cwd(), "../webappjam-pacts"),
  spec: 2,
  pactfileWriteMode: "update",
  consumer: "QizzoConsumer",
  provider: "QizzoProvider",
  host: "127.0.0.1",
});
