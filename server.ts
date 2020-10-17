import * as express from "express";
import * as bodyParser from "body-parser";
import sslRedirect from "heroku-ssl-redirect";
import { API } from "./src";

const path = require("path");
const cors = require("cors");

export class AppController {
  app: express.Express;
  port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "5000";

    this.app.use(sslRedirect());
    this.app.use("/api", API);
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(__dirname, "/client/build")));
  }
}

const controller = new AppController();

controller.app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

controller.app.listen(controller.port, () => console.log("Running..."));
