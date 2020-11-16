import React from "react";
import { TextField } from "../../need/a-textfield/TextField";
/* Can create abstract unit called 'AnswerComponent' where he helperText and state is injected */
export const AnswerChoiceTextField: React.FC<{
  id?: string;
  isCorrectChoice: boolean;
  choiceText: string;
  setChoiceText: (text: string) => void;
}> = ({ isCorrectChoice, choiceText, setChoiceText, id }) => {
  const helperText = isCorrectChoice
    ? "Insert the correct answer choice here."
    : "Insert an answer choice here.";
  const dataCorrectText = isCorrectChoice ? "correct" : "incorrect";
  return (
    <TextField
      id={id}
      required
      label="Required"
      text={choiceText}
      errorCondition={choiceText.length === 0}
      setText={setChoiceText}
      helperText={helperText}
      additionalProps={{
        "data-correct": dataCorrectText,
      }}
    />
  );
};
