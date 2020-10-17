import * as express from "express";
import * as bodyParser from "body-parser";
import sslRedirect from "heroku-ssl-redirect";
import { APIController } from "./src";
import { Database } from "./src/database";
import { Storeable } from "database/database";
import * as swaggerJsDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Qizzo App API",
      version: "1.0.0",
      description: "This is an API for the iOS Qizzo quiz making app",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
      contact: {
        name: "Markim Shaw",
        url: "https://qizzoapp.com",
        email: "markim@donderapps.com",
      },
    },
    servers: [{ url: "/api" }],
  },
  apis: ["./src/api/category/schema.ts", "./src/api/category/routes.ts"],
};
const specs = swaggerJsDoc(options);

const path = require("path");
const cors = require("cors");

export class AppController {
  app: express.Express;
  api: APIController;
  port: string;
  db: Storeable;

  constructor(db: Storeable = new Database()) {
    this.db = db;
    this.app = express();
    this.api = new APIController(db);
    this.port = process.env.PORT || "5000";

    this.setupRoutes();
  }

  setupRoutes() {
    this.app.use(sslRedirect());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.join(__dirname, "/client/build")));
    this.app.use("/docs", swaggerUi.serve);

    this.setupAPI();
  }

  setupAPI() {
    this.app.use("/api", this.api.api);
  }
}

const controller = new AppController();

controller.app.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

controller.app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

controller.app.listen(controller.port, () => console.log("Running..."));
