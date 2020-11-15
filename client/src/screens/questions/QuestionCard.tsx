import React from "react";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { MultipleChoiceQuestion } from "../../models/multiplechoice";

interface Question {
  id: string;
  name: string;
  incorrect_answers: string[];
  correct_answers: string[];
  inReview: boolean;
  categoryId: string;
  questionTypeId: string;
}

type QuestionComponent = {
  question: Question;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const LeftGrid: React.FC<QuestionComponent> = ({ question }) => (
  <Grid item xs container direction="column" spacing={2}>
    <Grid item xs>
      <Typography gutterBottom variant="subtitle1">
        {question.name}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Correct Answer Choices: {question.correct_answers.length} | Incorrect
        Answer Choices: {question.incorrect_answers.length}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Author
      </Typography>
    </Grid>
  </Grid>
);

const RightGrid: React.FC<QuestionComponent> = ({ question }) => (
  <Grid item>
    <Typography variant="subtitle1">{question.inReview}</Typography>
  </Grid>
);

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
        <LeftGrid question={question} />
        <RightGrid question={question} />
      </Grid>
    </Paper>
  );
};
