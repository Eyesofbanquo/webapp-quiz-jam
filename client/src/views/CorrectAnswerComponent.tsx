import { Card, TextField } from "@material-ui/core";
import React from "react";

/* Can create abstract unit called 'AnswerComponent' where he helperText and state is injected */
export const CorrectAnswerComponent: React.FC<{
  id?: string;
  isCorrectChoice: boolean;
  choiceText: string;
  setChoiceText: (text: string) => void;
}> = ({ isCorrectChoice, choiceText, setChoiceText, id }) => {
  const helperText = isCorrectChoice
    ? "Insert the correct answer choice here."
    : "Insert an answer choice here.";

  return (
    <Card style={{ padding: 16, borderRadius: 8, margin: 4 }}>
      <TextField
        data-correct={isCorrectChoice ? "correct" : "incorrect"}
        id={id}
        style={{ width: "100%" }}
        required
        label="Required"
        value={choiceText}
        error={choiceText.length === 0}
        onChange={(event) => {
          setChoiceText(event.target.value);
        }}
        helperText={helperText}
      />
    </Card>
  );
};
