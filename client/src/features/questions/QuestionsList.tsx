import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { QuestionCard } from "./QuestionCard";
import { makeRequest, useMakeRequest } from "../../networking/network";
import { DeleteItem } from "../../components/DeleteItem";
import { EmptyContent } from "../../components/EmptyContent";
import { deleteRequest } from "../../components/deleteItem.helper";
import { MultipleChoiceQuestion } from "./multiplechoice";

interface QuestionRequest {
  success: boolean;
  data: Question[];
}
interface Question {
  id: string;
  name: string;
  incorrectAnswers: string[];
  correctAnswers: string[];
  inReview: boolean;
  categoryId: string;
  questionTypeId: string;
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
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: 16 }}
    >
      {questions?.map((question) => (
        <QuestionCard
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
