/**
 * Category schema.
 * * This represents every category in the API. This can be created on server or, soon enough, the clietn side app.
 */

export interface Category {
  name: string;
  id: string;
  in_review: boolean;
  deleted: boolean;
  user_id: string;
}
