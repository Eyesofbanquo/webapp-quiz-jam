import * as express from "express";
import * as bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import pool from "../../database/pool";
import { decodeJWTMiddleware } from "../../middleware/jwt-middleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryTable,
} from "./queries";
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

    this.router.get(
      "/categories/auth",
      decodeJWTMiddleware,
      (request, response) => {
        console.log(request.body);
        response.send({ success: true, data: { message: "This works!" } });
      }
    );
  }

  post() {
    this.router.post("/categories", (request, response) => {
      const receivedBody = request.body as { name: string };
      /* Check that the item doesn't already exist first */
      let query = `INSERT INTO`;
      if (process.env.NODE_ENV === "test") {
        query = query + ` ${CategoryRouter.TEST_TABLE}`;
      } else {
        query = query + ` ${CategoryRouter.TABLE}`;
      }
      query =
        query +
        ` (id, name, inReview) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING RETURNING *`;

      createCategory({
        id: uuidv4(),
        name: receivedBody.name,
        in_review: true,
        deleted: false,
      })
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
    this.router.delete("/categories/:id", (request, response) => {
      pool
        .query(deleteCategory(), [request.params.id])
        .then((result) => {
          if (result.rows.length === 0) {
            response.send({
              success: false,
              error: { message: "Category does not exist" },
            });
            return;
          }
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
