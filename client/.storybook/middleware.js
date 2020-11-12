const express = require("express");
const bodyParser = require("body-parser");

const expressMiddleware = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.get("/api/categories", (request, response) => {
    response.send({
      success: true,
      data: [
        {
          id: "0",
          name: "League of Legends",
          in_review: false,
          deleted: false,
        },
        {
          id: "1",
          name: "Movies",
          in_review: false,
          deleted: false,
        },
      ],
    });
  });
};

module.exports = expressMiddleware;
