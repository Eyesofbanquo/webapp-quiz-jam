import { Deletable } from "./Deletable";

export interface Category extends Deletable {
  id: string;
  name: string;
  in_review: boolean;
  deleted: boolean;
}
