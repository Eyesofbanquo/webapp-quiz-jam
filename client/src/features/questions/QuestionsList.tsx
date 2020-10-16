import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import { MultipleChoiceQuestion, QuestionCard } from "./QuestionCard";
import { makeRequest, useMakeRequest } from "../../networking/network";
import { DeleteQuestion } from "./DeleteQuestion";
import { EmptyContent } from "../../components/EmptyContent";

const deleteQuestion = async (
  questions: MultipleChoiceQuestion[],
  selectedQuestion: MultipleChoiceQuestion
) => {
  let filteredQuestions: MultipleChoiceQuestion[] = [];
  await makeRequest({
    endpoint: "multiple",
    method: "delete",
    data: {
      question: selectedQuestion.question,
    },
  }).onReceive.then((response) => {
    if (response.data.success) {
      filteredQuestions = questions.filter(
        (question) => question.question !== selectedQuestion.question
      );
      // setQuestions(filteredQuestions);
      // setSelectedQuestion(undefined);
    }
  });
  return {
    filteredQuestions: filteredQuestions,
  };
};

export const QuestionList = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<
    MultipleChoiceQuestion
  >();

  const { request: questions, setRequest: setQuestions } = useMakeRequest<
    MultipleChoiceQuestion[]
  >({
    endpoint: "multiple",
    method: "get",
  });

  if (questions?.length === 0) {
    return <EmptyContent itemType="questions" />;
  }

  if (selectedQuestion) {
    return (
      <DeleteQuestion
        question={selectedQuestion}
        onDelete={() => {
          deleteQuestion(questions ?? [], selectedQuestion).then((result) => {
            setQuestions(result.filteredQuestions);
            setSelectedQuestion(undefined);
          });
        }}
      />
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
      {questions?.map((question) => (
        <QuestionCard
          key={question.question}
          question={question}
          onPress={(question) => {
            setSelectedQuestion(question);
          }}
        />
      ))}
    </Grid>
  );
};
