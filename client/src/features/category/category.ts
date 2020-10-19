import { Deletable } from "../../components/deleteItem.helper";

export interface Category extends Deletable {
  id: string;
  name: string;
  inReview: boolean;
}
