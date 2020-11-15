import {
  Button,
  Grid,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react";
import { CorrectAnswerComponent } from "../../views/CorrectAnswerComponent";
import { QuestionNameTextArea } from "../../views/question/QuestionNameTextArea";
import { makeRequest, useMakeRequest } from "../../networking/network";
import { CollapsibleAlert } from "../../need/an-alert/CollapsibleAlert";
import { initialFormState, validateFields } from "../../controllers/form";
import { reducer } from "../../controllers/form";
import { Category } from "../../models/category";
import { CategoryMenu } from "../../views/category/CategoryMenu";
import { DifficultyMenu } from "../../views/DifficultyMenu";

interface CategoryRequest {
  success: boolean;
  data: Category[];
}
export const QuizForm: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>();
  const [warningLabel, setWarningLabel] = useState<string>("");
  const [questionTypes, setQuestionTypes] = useState<
    { id: string; name: string }[]
  >([]);

  const array: (
    | "firstChoice"
    | "secondChoice"
    | "thirdChoice"
    | "fourthChoice"
  )[] = ["firstChoice", "secondChoice", "thirdChoice", "fourthChoice"];

  const { request: questionTypesRequest } = useMakeRequest<{
    success: Boolean;
    data: [{ id: string; name: string }];
  }>({ endpoint: "question-types", method: "get" });

  useEffect(() => {
    setQuestionTypes(questionTypesRequest?.data ?? []);
  }, [questionTypesRequest]);

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
          <CollapsibleAlert
            id={"post-status-alert"}
            type="success"
            text="Success!"
            showAlert={state.showSuccessAlert}
            setShowAlert={(val) => {
              dispatch({
                type: "showSuccessAlert",
                payload: val,
              });
            }}
          />
        </Grid>
        <Grid container>
          <h1>Create a question</h1>
          <Grid container direction="row" justify="center">
            <CategoryMenu
              onSelect={(category) => {
                setSelectedCategory(category);
              }}
            />
            <DifficultyMenu
              onSelect={(difficulty) => {
                setSelectedDifficulty(difficulty);
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8}>
        <QuestionNameTextArea
          questionText={state.questionText}
          setQuestionText={(text) => {
            dispatch({
              type: "questionText",
              payload: text,
            });
          }}
        />
        <Grid id="question-answer-choices">
          {array.map((value, index) => {
            if (index === 0) {
              const isCorrect = true;
              return (
                <CorrectAnswerComponent
                  key={index}
                  isCorrectChoice
                  choiceText={state[value]}
                  setChoiceText={(text) => {
                    dispatch({
                      type: value,
                      payload: text,
                    });
                  }}
                />
              );
            }
            return (
              <CorrectAnswerComponent
                key={index}
                isCorrectChoice={false}
                choiceText={state[value]}
                setChoiceText={(text) => {
                  dispatch({
                    type: value,
                    payload: text,
                  });
                }}
              />
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="center">
          <Button
            id={"choice-form-submit-button"}
            variant="contained"
            color="primary"
            onClick={(event) => {
              if (
                validateFields(
                  state.questionText,
                  state.firstChoice,
                  state.secondChoice,
                  state.thirdChoice,
                  state.fourthChoice
                )
              ) {
                makeRequest({
                  endpoint: "questions",
                  method: "post",
                  data: {
                    categoryId: `${selectedCategory?.id ?? ""}`,
                    questionTypeId: `${questionTypes[0].id}`,
                    difficulty: `${selectedDifficulty ?? "easy"}`,
                    name: `${state.questionText}`,
                    correctAnswers: [`${state.firstChoice}`],
                    incorrectAnswers: [
                      `${state.secondChoice}`,
                      `${state.thirdChoice}`,
                      `${state.fourthChoice}`,
                    ],
                  },
                }).onReceive.then((response) => {
                  if (response.data.success === false) {
                    setWarningLabel("This question already exists");
                    dispatch({
                      type: "showAlert",
                      payload: true,
                    });
                  } else {
                    dispatch({
                      type: "showSuccessAlert",
                      payload: true,
                    });
                    dispatch({
                      type: "questionText",
                      payload: "",
                    });
                    dispatch({
                      type: "firstChoice",
                      payload: "",
                    });
                    dispatch({
                      type: "secondChoice",
                      payload: "",
                    });
                    dispatch({
                      type: "thirdChoice",
                      payload: "",
                    });
                    dispatch({
                      type: "fourthChoice",
                      payload: "",
                    });
                  }
                });
              } else {
                setWarningLabel(
                  "You must correctly fill out all fields to move on."
                );
                dispatch({
                  type: "showAlert",
                  payload: true,
                });
              }
            }}
          >
            Submit
          </Button>
        </Grid>
        <Grid container>
          <CollapsibleAlert
            id={"warning-alert"}
            type="info"
            text={warningLabel}
            showAlert={state.showAlert}
            setShowAlert={(val) => {
              dispatch({
                type: "showAlert",
                payload: val,
              });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
