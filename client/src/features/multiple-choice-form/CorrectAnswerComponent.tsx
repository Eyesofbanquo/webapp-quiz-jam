import { Card, TextField } from "@material-ui/core";
import React from "react";

export const CorrectAnswerComponent: React.FC<{
  isCorrectChoice: boolean;
  choiceText: string;
  setChoiceText: (text: string) => void;
}> = ({ isCorrectChoice, choiceText, setChoiceText }) => {
  const helperText = isCorrectChoice
    ? "Insert the correct answer choice here."
    : "Insert an answer choice here.";

  return (
    <Card style={{ padding: 16, borderRadius: 8, margin: 4 }}>
      <TextField
        style={{ width: "100%" }}
        required
        label="Required"
        value={choiceText}
        onChange={(event) => {
          setChoiceText(event.target.value);
        }}
        helperText={helperText}
      />
    </Card>
  );
};
