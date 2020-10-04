import {
  Button,
  Grid,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { CorrectAnswerComponent } from "./CorrectAnswerComponent";
import { QuestionComponent } from "./QuestionComponent";

const categories = ["Entertainment: Video Games", "Books", "Music", "Film"];
const difficulty = ["easy", "normal", "hard"];

const validateFields = (
  questionText: string,
  firstChoice: string,
  secondChoice: string,
  thirdChoice: string,
  fourthChoice: string
) => {
  return (
    questionText.length > 0 &&
    firstChoice.length > 0 &&
    secondChoice.length > 0 &&
    thirdChoice.length > 0 &&
    fourthChoice.length > 0
  );
};

const Category: React.FC<{
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
}> = ({ categoryIndex, setCategoryIndex }) => {
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
            secondary={categories[categoryIndex]}
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
              key={category}
              selected={index === categoryIndex}
              onClick={(event) => {
                setCategoryIndex(index);
                setAnchorElement(null);
              }}
            >
              {category}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

const Difficulty: React.FC<{
  difficultyIndex: number;
  setDifficultyIndex: (difficulty: number) => void;
}> = ({ difficultyIndex, setDifficultyIndex }) => {
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

const CollapsibleAlert: React.FC<{
  showAlert: boolean;
  setShowAlert: (isVisible: boolean) => void;
}> = ({ showAlert, setShowAlert }) => (
  <Collapse in={showAlert} style={{ margin: "auto" }}>
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setShowAlert(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      style={{ padding: 8, marginTop: 8 }}
      severity="info"
    >
      You must fill out all fields to move on.
    </Alert>
  </Collapse>
);

export const QuizForm: React.FC<{}> = () => {
  const [questionText, setQuestionText] = useState<string>("");
  const [firstChoice, setFirstChoice] = useState<string>("");
  const [secondChoice, setSecondChoice] = useState<string>("");
  const [thirdChoice, setThirdChoice] = useState<string>("");
  const [fourthChoice, setFourthChoice] = useState<string>("");
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [difficultyIndex, setDifficultyIndex] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const options: AxiosRequestConfig = {
    url: "/api/multiple",
    method: "post",
    data: {
      id: 0,
      category: `${categories[categoryIndex]}`,
      type: "multiple",
      difficulty: `${difficulty[difficultyIndex]}`,
      question: `${questionText}`,
      correct_answer: `${firstChoice}`,
      incorrect_answers: [
        `${secondChoice}`,
        `${thirdChoice}`,
        `${fourthChoice}`,
      ],
    },
  };

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
          <h1>Create a question</h1>
          <Grid container direction="row" justify="center">
            <Category
              categoryIndex={categoryIndex}
              setCategoryIndex={setCategoryIndex}
            />
            <Difficulty
              difficultyIndex={difficultyIndex}
              setDifficultyIndex={setDifficultyIndex}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8}>
        <QuestionComponent
          questionText={questionText}
          setQuestionText={setQuestionText}
        />
        <CorrectAnswerComponent
          isCorrectChoice
          choiceText={firstChoice}
          setChoiceText={setFirstChoice}
        />
        <CorrectAnswerComponent
          isCorrectChoice={false}
          choiceText={secondChoice}
          setChoiceText={setSecondChoice}
        />
        <CorrectAnswerComponent
          isCorrectChoice={false}
          choiceText={thirdChoice}
          setChoiceText={setThirdChoice}
        />
        <CorrectAnswerComponent
          isCorrectChoice={false}
          choiceText={fourthChoice}
          setChoiceText={setFourthChoice}
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
                  questionText,
                  firstChoice,
                  secondChoice,
                  thirdChoice,
                  fourthChoice
                )
              ) {
                axios(options).then((response) => {
                  console.log(response.status);
                });
              } else {
                setShowAlert(true);
              }
            }}
          >
            Submit
          </Button>
        </Grid>
        <Grid container>
          <CollapsibleAlert showAlert={showAlert} setShowAlert={setShowAlert} />
        </Grid>
      </Grid>
    </Grid>
  );
};
