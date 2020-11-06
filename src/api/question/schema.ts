export interface Question {
  id: string;
  name: string;
  in_review: boolean;
  correct_answers: string[];
  incorrect_answers: string[];
  category_uid: string;
  question_type_uid: string;
  deleted: boolean;
  difficulty: string;
}
