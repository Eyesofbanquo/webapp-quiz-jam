import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { MultipleChoiceQuestion, QuestionCard } from "./QuestionCard";
import { makeRequest, useMakeRequest } from "../../networking/network";
import { deleteItem, DeleteItem } from "../../components/DeleteItem";
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
      <DeleteItem
        itemName={selectedQuestion.question}
        onDelete={() => {
          deleteItem<MultipleChoiceQuestion>({
            items: questions ?? [],
            selectedItem: selectedQuestion,
            endpoint: "multiple",
          }).then((result) => {
            setQuestions(result.filteredItems);
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
