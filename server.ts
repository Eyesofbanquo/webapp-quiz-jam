const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/api/welcome", (req, res) => {
  res.json([
    {
      haha: "hehe",
    },
  ]);
});

app.get(
  "/.well-known/acme-challenge/lJ8GgOkdO0-XJYLBCdz5dVLVxObpUjV0L2jgREx5NZA",
  (req, res) => {
    res.send(
      "lJ8GgOkdO0-XJYLBCdz5dVLVxObpUjV0L2jgREx5NZA.JeYkyIaUj0PK-gp1JG3h4vL5E3AMplTG4wv5Thl-UVo"
    );
  }
);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

app.listen(port, () => console.log("Running..."));
