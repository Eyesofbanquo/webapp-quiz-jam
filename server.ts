import * as express from "express";
import * as bodyParser from "body-parser";
import sslRedirect from "heroku-ssl-redirect";
import { APIController } from "./src";
import { Database } from "./src/database";
import { Storeable } from "database/database";

const path = require("path");
const cors = require("cors");

export class AppController {
  app: express.Express;
  api: APIController;
  port: string;

  constructor() {
    this.app = express();
    this.api = new APIController();
    this.port = process.env.PORT || "5000";

    this.setupRoutes();
  }

  setupRoutes() {
    this.app.use(sslRedirect());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(__dirname, "/client/build")));

    this.setupAPI();
  }

  setupAPI() {
    this.app.use("/api", this.api.api);
  }
}

const controller = new AppController();

controller.app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

controller.app.listen(controller.port, () =>
  console.log("Running on port", controller.port)
);
