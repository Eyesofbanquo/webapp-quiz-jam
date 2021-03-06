import { Paper, TextareaAutosize } from "@material-ui/core";
import React from "react";
import { TextArea } from "../../need/a-textarea/TextArea";

/* Can create a abstract unit called EditableHeader */
export const QuestionNameTextArea: React.FC<{
  questionText: string;
  setQuestionText: (text: string) => void;
}> = ({ questionText, setQuestionText }) => {
  return (
    <TextArea
      id={"question-name-textfield"}
      text={questionText}
      setText={setQuestionText}
      placeholder={"Insert your question here."}
    />
  );
};
