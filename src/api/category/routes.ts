import * as express from "express";
import * as bodyParser from "body-parser";
import { Database } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { CategorySchema } from "./schema";

export const categoryRouter = express.Router();
const db = new Database();
categoryRouter.use(bodyParser.json());

categoryRouter.get("/categories", (request, response) => {
  db.realm(CategorySchema).then((realm) => {
    const allObjects: any = realm.objects("Category");
    response.statusCode = 200;
    response.send(allObjects);
    realm.close();
  });
});

categoryRouter.post("/categories", (request, response) => {
  const receivedBody = request.body as { name: string };

  /* Check that the item doesn't already exist first */

  db.realm(CategorySchema).then((realm) => {
    const allObjects = realm
      .objects("Category")
      .filtered(`name CONTAINS[c] "${receivedBody.name}"`);

    if (allObjects.length > 0) {
      response.send({ success: false, savedObject: null });
      realm.close();
      return;
    }

    if (allObjects.length === 0) {
      const realmSavableCategory = { ...receivedBody, id: uuidv4() };

      realm.write(() => {
        realm.create("Category", { ...realmSavableCategory, inReview: true });
      });
      response.send({ success: true, savedObject: realmSavableCategory });
      realm.close();
    }
  });
});

categoryRouter.delete("/categories", (request, response) => {
  db.realm(CategorySchema).then((realm) => {
    const allObjects = realm
      .objects("Category")
      .filtered(`id == "${request.body.id}"`);

    if (allObjects.length === 0) {
      response.send({ success: false });
      realm.close();
      return;
    }

    const foundObject = allObjects[0];

    realm.write(() => {
      realm.delete(foundObject);
    });

    response.send({ success: true });
    realm.close();
  });
});
