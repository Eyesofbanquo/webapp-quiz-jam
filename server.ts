import * as express from "express";
import * as bodyParser from "body-parser";
import * as Realm from "realm";
import sslRedirect from "heroku-ssl-redirect";
import { API } from "./src";

const path = require("path");
const cors = require("cors");

export const app = express();

const port = process.env.PORT || 5000;

app.use(sslRedirect());
app.use("/api", API);
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => console.log("Running..."));
