/**
 * Category schema.
 * * This represents every category in the API. This can be created on server or, soon enough, the clietn side app.
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
