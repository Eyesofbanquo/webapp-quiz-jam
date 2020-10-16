import { Deletable } from "../../components/deleteItem.helper";

export interface MultipleChoiceQuestion extends Deletable {
  category: string;
  correct_answer: string;
  difficulty: string;
  id: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
