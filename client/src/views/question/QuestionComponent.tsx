import { Paper, TextareaAutosize } from "@material-ui/core";
import React from "react";
import { TextField } from "../../need/a-textfield/TextField";

/* Can create a abstract unit called EditableHeader */
export const QuestionComponent: React.FC<{
  questionText: string;
  setQuestionText: (text: string) => void;
}> = ({ questionText, setQuestionText }) => {
  return (
    <TextField
      id={"question-name-textfield"}
      text={questionText}
      setText={setQuestionText}
      placeholder={"Insert your question here."}
    />
  );
};
