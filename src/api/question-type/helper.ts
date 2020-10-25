import { QUESTION_TYPE_TABLE, QUESTION_TYPE_TABLE_TEST } from "./queries";

type QuestionResponse = {
  id: string;
  name: string;
};

export type QuestionTypeResponse = {
  success: boolean;
  data: QuestionResponse | [QuestionResponse];
};
