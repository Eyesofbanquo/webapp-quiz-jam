import {
  Button,
  Grid,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CorrectAnswerComponent } from "./components/CorrectAnswerComponent";
import { QuestionComponent } from "./components/QuestionComponent";
import { makeRequest } from "../../networking/network";
import { CollapsibleAlert } from "../../components/CollapsibleAlert";

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

interface Category {
  id: string;
  name: string;
  inReview: boolean;
}

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
  const [questionText, setQuestionText] = useState<string>("");
  const [firstChoice, setFirstChoice] = useState<string>("");
  const [secondChoice, setSecondChoice] = useState<string>("");
  const [thirdChoice, setThirdChoice] = useState<string>("");
  const [fourthChoice, setFourthChoice] = useState<string>("");
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [difficultyIndex, setDifficultyIndex] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);

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
            showAlert={showSuccessAlert}
            setShowAlert={setShowSuccessAlert}
          />
        </Grid>
        <Grid container>
          <h1>Create a question</h1>
          <Grid container direction="row" justify="center">
            <CategoryMenu
              categories={categories}
              categoryIndex={categoryIndex}
              setCategoryIndex={setCategoryIndex}
            />
            <DifficultyMenu
              difficulty={difficulty}
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
                makeRequest({
                  endpoint: "multiple",
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
                }).onReceive.then((response) => {
                  setShowSuccessAlert(true);
                  setQuestionText("");
                  setFirstChoice("");
                  setSecondChoice("");
                  setThirdChoice("");
                  setFourthChoice("");
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
          <CollapsibleAlert
            type="info"
            text="You must fill out all fields to move on."
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
