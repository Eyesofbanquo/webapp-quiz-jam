import {
  Button,
  Grid,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { CorrectAnswerComponent } from "./CorrectAnswerComponent";
import { QuestionComponent } from "./QuestionComponent";

const categories = ["Entertainment: Video Games", "Books", "Music", "Film"];

export const QuizForm: React.FC<{}> = () => {
  const [questionText, setQuestionText] = useState<string>("");
  const [firstChoice, setFirstChoice] = useState<string>("");
  const [secondChoice, setSecondChoice] = useState<string>("");
  const [thirdChoice, setThirdChoice] = useState<string>("");
  const [fourthChoice, setFourthChoice] = useState<string>("");
  const [anchorElement, setAnchorElement] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  const options: AxiosRequestConfig = {
    url: "/api/multiple",
    method: "post",
    data: {
      id: 0,
      category: `${categories[categoryIndex]}`,
      type: "multiple",
      difficulty: "easy",
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
          <Grid container style={{ justifyContent: "center" }}>
            <List component="nav" aria-label="Device settings">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Choose your category"
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
              axios(options).then((response) => {
                console.log(response.status);
              });
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
