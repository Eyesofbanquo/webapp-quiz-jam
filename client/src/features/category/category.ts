import { Deletable } from "../../components/deleteItem.h";

export interface Category extends Deletable {
  id: string;
  name: string;
  inReview: boolean;
}
