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
import { CorrectAnswerComponent } from "./components/CorrectAnswerComponent";
import { QuestionComponent } from "./components/QuestionComponent";
import { makeRequest } from "../../networking/network";
import { CollapsibleAlert } from "../../components/CollapsibleAlert";
import { initialFormState, validateFields } from "./helper";
import { reducer } from "./helper";
import { Category } from "../category/category";

const difficulty = ["easy", "normal", "hard"];

const CategoryMenu: React.FC<{
  categories: Category[];
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
}> = ({ categories, categoryIndex, setCategoryIndex }) => {
  const [anchorElement, setAnchorElement] = useState(null);

  return (
    <>
      <List component="nav">
        <ListItem
          button
          onClick={(event) => {
            setAnchorElement(event.currentTarget as any);
          }}
        >
          <ListItemText
            primary="Chose your category"
            secondary={categories[categoryIndex]?.name}
          />
        </ListItem>
      </List>
      <Menu
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        keepMounted
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        {categories.map((category, index) => {
          return (
            <MenuItem
              key={category?.id}
              selected={index === categoryIndex}
              onClick={(event) => {
                setCategoryIndex(index);
                setAnchorElement(null);
              }}
            >
              {category?.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

const DifficultyMenu: React.FC<{
  difficulty: string[];
  difficultyIndex: number;
  setDifficultyIndex: (difficulty: number) => void;
}> = ({ difficulty, difficultyIndex, setDifficultyIndex }) => {
  const [anchorElement, setAnchorElement] = useState(null);

  return (
    <>
      <List component="nav">
        <ListItem
          button
          onClick={(event) => {
            setAnchorElement(event.currentTarget as any);
          }}
        >
          <ListItemText
            primary="Chose your difficulty"
            secondary={difficulty[difficultyIndex]}
          />
        </ListItem>
      </List>

      <Menu
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        keepMounted
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        {difficulty.map((difficulty, index) => {
          return (
            <MenuItem
              key={difficulty}
              selected={index === difficultyIndex}
              onClick={(event) => {
                setDifficultyIndex(index);
                setAnchorElement(null);
              }}
            >
              {difficulty}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export const QuizForm: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const receiveCategories = makeRequest({
      endpoint: "categories",
      method: "get",
    }).onReceive;

    receiveCategories
      .then((results) => {
        console.log(results.data);
        setCategories(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              categories={categories}
              categoryIndex={state.categoryIndex}
              setCategoryIndex={(index) => {
                dispatch({
                  type: "categoryIndex",
                  payload: index,
                });
              }}
            />
            <DifficultyMenu
              difficulty={difficulty}
              difficultyIndex={state.difficultyIndex}
              setDifficultyIndex={(index) => {
                dispatch({
                  type: "difficultyIndex",
                  payload: index,
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8}>
        <QuestionComponent
          questionText={state.questionText}
          setQuestionText={(text) => {
            dispatch({
              type: "questionText",
              payload: text,
            });
          }}
        />
        <CorrectAnswerComponent
          isCorrectChoice
          choiceText={state.firstChoice}
          setChoiceText={(text) => {
            dispatch({
              type: "firstChoice",
              payload: text,
            });
          }}
        />
        <CorrectAnswerComponent
          isCorrectChoice={false}
          choiceText={state.secondChoice}
          setChoiceText={(text) => {
            dispatch({
              type: "secondChoice",
              payload: text,
            });
          }}
        />
        <CorrectAnswerComponent
          isCorrectChoice={false}
          choiceText={state.thirdChoice}
          setChoiceText={(text) => {
            dispatch({
              type: "thirdChoice",
              payload: text,
            });
          }}
        />
        <CorrectAnswerComponent
          isCorrectChoice={false}
          choiceText={state.fourthChoice}
          setChoiceText={(text) => {
            dispatch({
              type: "fourthChoice",
              payload: text,
            });
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="center">
          <Button
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
                  endpoint: "multiple",
                  method: "post",
                  data: {
                    id: 0,
                    category: `${categories[state.categoryIndex].name}`,
                    type: "multiple",
                    difficulty: `${difficulty[state.difficultyIndex]}`,
                    question: `${state.questionText}`,
                    correct_answer: `${state.firstChoice}`,
                    incorrect_answers: [
                      `${state.secondChoice}`,
                      `${state.thirdChoice}`,
                      `${state.fourthChoice}`,
                    ],
                  },
                }).onReceive.then((response) => {
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
                });
              } else {
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
            type="info"
            text="You must fill out all fields to move on."
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
