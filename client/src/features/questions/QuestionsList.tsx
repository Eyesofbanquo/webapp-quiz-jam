import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { QuestionCard } from "./QuestionCard";
import { makeRequest, useMakeRequest } from "../../networking/network";
import { DeleteItem } from "../../components/DeleteItem";
import { EmptyContent } from "../../components/EmptyContent";
import { deleteRequest } from "../../components/DeleteItem.h";
import { MultipleChoiceQuestion } from "./multiplechoice";

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
          deleteRequest<MultipleChoiceQuestion>({
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
