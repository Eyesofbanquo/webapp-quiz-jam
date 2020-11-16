import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { Question } from "../../models/question";
import { QuestionCardLeftGridItem } from "./QuestionCardLeftGridItem";
import { QuestionCardRightGridItem } from "./QuestionCardRightGridItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

export const QuestionCard: React.FC<{
  index: number;
  question: Question;
  onPress: (question: Question) => void;
}> = ({ question, onPress, index }) => {
  const theme = useStyles();

  return (
    <Paper
      data-row={`question-row-${index}`}
      className={theme.paper}
      style={{ cursor: "pointer", margin: 8 }}
      onClick={() => {
        onPress(question);
      }}
    >
      <Grid item>
        <QuestionCardLeftGridItem question={question} />
        <QuestionCardRightGridItem in_review={question.in_review} />
      </Grid>
    </Paper>
  );
};
