/**
 * This represents a MultipleChoice question item in the Database.
 * ? This will more than likely be deprecated.
 */
export const MultipleChoiceSchema = {
  name: "MultipleChoice",
  primaryKey: "id",
  properties: {
    id: "string",
    category: "string",
    type: "string",
    difficulty: "string",
    question: { type: "string", indexed: true },
    correct_answer: "string",
    incorrect_answers: "string[]",
    inReview: { type: "bool", indexed: true },
  },
};

export interface AnswerResponse {
  category: string;
  type: string;
  difficulty: string;
  question: string;
}

export interface MultipleChoice {
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TFChoice {
  correct_answer: "True" | "False";
  incorrect_answers: ["True"] | ["False"];
}
