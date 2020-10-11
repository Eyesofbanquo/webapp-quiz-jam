import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import { MultipleChoiceQuestion, QuestionCard } from "./QuestionCard";
import { makeRequest } from "../../networking/network";

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
  });

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
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ padding: 16 }}
      >
        <h1>Delete</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            makeRequest({
              endpoint: "multiple",
              method: "delete",
              data: {
                question: selectedQuestion.question,
              },
            }).onReceive.then((response) => {
              if (response.data.success) {
                const filteredQuestions = questions.filter(
                  (question) => question.question !== selectedQuestion.question
                );
                setQuestions(filteredQuestions);
                setSelectedQuestion(undefined);
              }
            });
          }}
        >
          Deelte me
        </Button>
      </Grid>
    );
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
          key={question.question}
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
