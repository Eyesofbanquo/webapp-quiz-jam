import React from "react";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";

export interface MultipleChoiceQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  id: number;
  incorrect_answers: string[];
  question: string;
  type: string;
}

type QuestionComponent = {
  question: MultipleChoiceQuestion;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: 500,
  },
}));

const LeftGrid: React.FC<QuestionComponent> = ({ question }) => (
  <Grid item xs container direction="column" spacing={2}>
    <Grid item xs>
      <Typography gutterBottom variant="subtitle1">
        {question.question}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {question.category}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Author
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2" style={{ cursor: "pointer", color: "red" }}>
        Remove
      </Typography>
    </Grid>
  </Grid>
);

const RightGrid: React.FC<QuestionComponent> = ({ question }) => (
  <Grid item>
    <Typography variant="subtitle1">{question.type}</Typography>
  </Grid>
);

export const QuestionCard: React.FC<{
  question: MultipleChoiceQuestion;
  onPress: (question: MultipleChoiceQuestion) => void;
}> = ({ question, onPress }) => {
  const theme = useStyles();

  return (
    <Paper
      className={theme.paper}
      style={{ cursor: "pointer", margin: 8 }}
      onClick={() => {
        onPress(question);
      }}
    >
      <Grid item xs={12} sm container>
        <LeftGrid question={question} />
        <RightGrid question={question} />
      </Grid>
    </Paper>
  );
};
