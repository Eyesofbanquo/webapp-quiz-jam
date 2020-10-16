import { Deletable } from "../../components/DeleteItem";

export interface Category extends Deletable {
  id: string;
  name: string;
  inReview: boolean;
}
