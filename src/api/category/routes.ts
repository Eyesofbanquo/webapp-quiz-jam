import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import pool from "../../database/pool";
import { createCategory, getCategories, getCategoryTable } from "./queries";
import { create } from "ts-node";
const cors = require("cors");

export const CATEGORY_TABLE = "categories";
export class CategoryRouter {
  public static readonly TABLE = CATEGORY_TABLE;
  private static readonly TEST_TABLE = `category_test`;
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.use(bodyParser.json());
    this.router.use(cors());
    this.setupRoutes();
  }

  get() {
    this.router.get("/categories", (request, response) => {
      let query = `SELECT * FROM`;
      if (process.env.NODE_ENV === "test") {
        query = query + ` ${getCategoryTable()}`;
      } else {
        query = query + ` ${getCategoryTable()}`;
      }

      pool
        .query(getCategories())
        .then((res) => {
          response.statusCode = 200;
          response.send({ success: true, data: res.rows });
        })
        .catch((err) => {
          response.send({ success: false, error: err });
        });
    });
  }

  post() {
    this.router.post("/categories", (request, response) => {
      const receivedBody = request.body as { name: string };
      /* Check that the item doesn't already exist first */

      pool
        .query(createCategory(), [uuidv4(), receivedBody.name, true])
        .then((res) => {
          if (res.rows.length === 0) {
            response.statusCode = 200;
            response.send({ success: false, data: null });
            return;
          }
          response.statusCode = 201;
          response.send({ success: true, data: res.rows[0] });
        })
        .catch((err) => {
          response.send({ success: false, error: err });
        });
    });
  }

  delete() {
    this.router.delete("/categories", (request, response) => {
      let query = `DELETE FROM`;
      if (process.env.NODE_ENV === "test") {
        query = query + ` ${getCategoryTable()}`;
      } else {
        query = query + ` ${getCategoryTable()}`;
      }
      query = query + ` WHERE id = $1 RETURNING *`;

      pool
        .query(query, [request.body.id])
        .then((result) => {
          response.send({ success: true, data: result.rows[0] });
        })
        .catch((error) => {
          response.send({ success: false, data: null });
        });
    });

    this.router.delete("/categories/:id", (request, response) => {
      let query = `DELETE FROM`;
      if (process.env.NODE_ENV === "test") {
        query = query + ` ${getCategoryTable()}`;
      } else {
        query = query + ` ${getCategoryTable()}`;
      }
      query = query + ` WHERE id = $1 RETURNING *`;

      pool
        .query(query, [request.params.id])
        .then((result) => {
          response.send({ success: true, data: result.rows[0] });
        })
        .catch((error) => {
          response.send({ success: false, data: null });
        });
    });
  }

  setupRoutes() {
    this.get();

    this.post();

    this.delete();
  }
}
