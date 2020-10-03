import {
  Button,
  Card,
  Grid,
  Paper,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

const CorrectAnswerComponent: React.FC<{ isCorrectChoice: boolean }> = ({
  isCorrectChoice,
}) => {
  const [choiceText, setChoiceText] = useState<string>("");

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

const QuestionComponent = () => {
  const [questionText, setQuestionText] = useState<string>("");

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

export const QuizForm: React.FC<{}> = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={8}>
        <Grid container>
          <h1>Create a question</h1>
        </Grid>
      </Grid>

      <Grid item xs={8}>
        <QuestionComponent />
        <CorrectAnswerComponent isCorrectChoice />
        <CorrectAnswerComponent isCorrectChoice={false} />
        <CorrectAnswerComponent isCorrectChoice={false} />
        <CorrectAnswerComponent isCorrectChoice={false} />
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="center">
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
