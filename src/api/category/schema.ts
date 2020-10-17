/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *          description: The name of the category
 *        inReview:
 *          type: boolean
 *          description: Whether or not the category is currently in review. This defaults to true.
 *      example:
 *        id: 0
 *        name: League of Legends
 *        inReview: true
 */
export const CategorySchema = {
  name: "Category",
  primaryKey: "id",
  properties: {
    id: "string",
    name: { type: "string", indexed: true },
    inReview: { type: "bool", indexed: true },
  },
};
