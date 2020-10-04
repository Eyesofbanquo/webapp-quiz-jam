import { Paper, TextareaAutosize } from "@material-ui/core";
import React from "react";

export const QuestionComponent: React.FC<{
  questionText: string;
  setQuestionText: (text: string) => void;
}> = ({ questionText, setQuestionText }) => {
  return (
    <Paper style={{ padding: 16, borderRadius: 8, margin: 4 }}>
      <TextareaAutosize
        style={{ width: "100%" }}
        aria-label="minimum height"
        rowsMin={3}
        value={questionText}
        onChange={(event) => {
          setQuestionText(event.target.value);
        }}
        placeholder="Insert your question here."
      />
    </Paper>
  );
};
