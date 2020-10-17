import * as express from "express";
import * as bodyParser from "body-parser";
import { Database } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { CategorySchema } from "./schema";
import { Storeable } from "database/database";

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: A category for a quiz question.
 */
export class CategoryRouter {
  public static readonly SCHEMA = "Category";
  db: Storeable;
  router: express.Router;

  constructor(db: Storeable = new Database()) {
    this.db = db;
    this.router = express.Router();
    this.router.use(bodyParser.json());
    this.setupRoutes();
  }
  get() {
    /**
     * @swagger
     * path:
     *  /categories/:
     *    get:
     *      summary: Retrieve all categories.
     *      tags: [Category]
     *      responses:
     *        "200":
     *          description: All category objects
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    this.router.get("/categories", (request, response) => {
      this.db.realm(CategorySchema).then((realm) => {
        const allObjects: any = realm.objects(CategoryRouter.SCHEMA);
        response.statusCode = 200;
        response.send(allObjects);
        realm.close();
      });
    });
  }

  post() {
    /**
     * @swagger
     * path:
     *  /categories/:
     *    post:
     *      summary: Create a new category. This automatically sets inReview to true.
     *      tags: [Category]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              name:
     *                type: string
     *                description: The name of the category
     *      responses:
     *        "200":
     *          description: Returns the object that was just saved
     *          content:
     *            application/json:
     *              example:
     *                success: true
     *                savedObject:
     *                  id: 0
     *                  name: Nightmare
     *                  inReview: false
     *
     */
    this.router.post("/categories", (request, response) => {
      const receivedBody = request.body as { name: string };

      /* Check that the item doesn't already exist first */

      this.db.realm(CategorySchema).then((realm) => {
        const allObjects = realm
          .objects(CategoryRouter.SCHEMA)
          .filtered(`name CONTAINS[c] "${receivedBody.name}"`);

        if (allObjects.length > 0) {
          response.send({ success: false, savedObject: null });
          realm.close();
          return;
        }

        if (allObjects.length === 0) {
          const realmSavableCategory = { ...receivedBody, id: uuidv4() };

          realm.write(() => {
            realm.create(CategoryRouter.SCHEMA, {
              ...realmSavableCategory,
              inReview: true,
            });
          });
          response.statusCode = 200;
          response.send({ success: true, savedObject: realmSavableCategory });
          realm.close();
        }
      });
    });
  }

  delete() {
    /**
     * @swagger
     * path:
     *  /categories/:
     *    delete:
     *      summary: Deletes the category.
     *      tags: [Category]
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              id:
     *                type: string
     *                description: The id of the category to delete.
     *      responses:
     *        "200":
     *          description: Returns the object that was just deleted
     *          content:
     *            application/json:
     *              example:
     *                success: true
     *                data:
     *                  id: 0
     *                  name: Nightmare
     *                  inReview: false
     *
     */
    this.router.delete("/categories", (request, response) => {
      this.db.realm(CategorySchema).then((realm) => {
        const allObjects = realm
          .objects(CategoryRouter.SCHEMA)
          .filtered(`id == "${request.body.id}"`);

        if (allObjects.length === 0) {
          response.send({ success: false });
          realm.close();
          return;
        }

        const foundObject = allObjects[0];

        response.send({ success: true, data: foundObject });

        realm.write(() => {
          realm.delete(foundObject);
        });

        realm.close();
      });
    });
  }

  setupRoutes() {
    this.get();

    this.post();

    this.delete();
  }
}
