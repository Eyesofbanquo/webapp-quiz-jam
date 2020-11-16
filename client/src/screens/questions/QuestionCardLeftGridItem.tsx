import React from "react";
import { Question } from "../../models/question";
import {
  ThreeRowGridItem,
  ThreeRowGridItemProps,
} from "../../need/a-grid-item/ThreeRowGridItem";

interface QuestionCardLeftGridItemProps {
  question: Question;
}
export const QuestionCardLeftGridItem: React.FC<QuestionCardLeftGridItemProps> = ({
  question,
}) => {
  const headline = question.name;
  const subheadline = `Correct Answer Choices: ${question.correct_answers.length} | Incorrect
Answer Choices: ${question.incorrect_answers.length}`;
  const baseline = "Author";
  return <ThreeRowGridItem top={headline} mid={subheadline} bot={baseline} />;
};
