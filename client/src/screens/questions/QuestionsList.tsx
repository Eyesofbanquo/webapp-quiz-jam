import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { QuestionCard } from "./QuestionCard";
import { makeRequest, useMakeRequest } from "../../networking/network";
import { DeleteItem } from "../../views/DeleteItem";
import { EmptyContent } from "../../views/EmptyContent";
import { deleteRequest } from "../../networking/deleteItem.helper";
import { Question } from "../../models/question";

interface QuestionRequest {
  success: boolean;
  data: Question[];
}
export const QuestionList = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const { request: questionsRequest } = useMakeRequest<QuestionRequest>({
    endpoint: "questions",
    method: "get",
  });

  useEffect(() => {
    setQuestions(questionsRequest?.data ?? []);
  }, [questionsRequest]);

  if (questions?.length === 0) {
    return <EmptyContent itemType="questions" />;
  }

  if (selectedQuestion) {
    return (
      <DeleteItem
        itemName={selectedQuestion.name}
        onDelete={() => {
          deleteRequest<Question>({
            items: questions ?? [],
            selectedItem: selectedQuestion,
            endpoint: "questions",
          }).then((result) => {
            setQuestions(result.filteredItems);
            setSelectedQuestion(undefined);
          });
        }}
      />
    );
  }

  return (
    <Grid container xs={12} direction="row" style={{ padding: 16 }}>
      {questions?.map((question, index) => (
        <QuestionCard
          index={index}
          key={question.id}
          question={question}
          onPress={(question) => {
            setSelectedQuestion(question);
          }}
        />
      ))}
    </Grid>
  );
};
