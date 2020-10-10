import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { MultipleChoiceQuestion, QuestionCard } from "./QuestionCard";

export const QuestionList = () => {
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);
  const allQuestions = axios.get("/api/multiple");
  const [selectedQuestion, setSelectedQuestion] = useState<
    MultipleChoiceQuestion
  >();

  useEffect(() => {
    allQuestions.then((response) => {
      const decodable: MultipleChoiceQuestion[] = response.data;
      setQuestions(decodable);
    });
  }, []);

  if (questions.length === 0) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ padding: 16 }}
      >
        <h1>No questions exist yet :(</h1>
      </Grid>
    );
  }

  if (selectedQuestion) {
    return <h1>Preview Questions</h1>;
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: 16 }}
    >
      {questions.map((question) => (
        <QuestionCard
          question={question}
          onPress={(question) => {
            console.log("You selected", question.question);
            setSelectedQuestion(question);
          }}
        />
      ))}
    </Grid>
  );
};
