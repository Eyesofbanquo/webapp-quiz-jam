import { Grid, Button } from "@material-ui/core";
import React from "react";
import { MultipleChoiceQuestion } from "./QuestionCard";

interface DeleteQuestionProps {
  question: MultipleChoiceQuestion;
  onDelete: () => void;
}
export const DeleteQuestion: React.FC<DeleteQuestionProps> = ({
  question,
  onDelete,
}) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: 16 }}
    >
      <h1>{question.question}</h1>
      <Button variant="contained" color="secondary" onClick={onDelete}>
        Delete
      </Button>
    </Grid>
  );
};
