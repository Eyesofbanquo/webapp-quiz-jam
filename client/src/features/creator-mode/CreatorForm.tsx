import { Grid, Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

interface Item {
  name: string;
  actions: { name: string; endpoint: string }[];
}
const items: Item[] = [
  {
    name: "Category",
    actions: [
      { name: "Show Categories", endpoint: "/categories" },
      { name: "Create a Category", endpoint: "/create-category" },
    ],
  },
  {
    name: "Quiz",
    actions: [
      { name: "Show Quizzes", endpoint: "/questions" },
      { name: "Create a Quiz", endpoint: "/create-quiz" },
    ],
  },
];

export const CreatorForm: React.FC = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {items.map((item) => {
        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h3">{item.name}</Typography>
            {item.actions.map((action) => (
              <Link
                to={action.endpoint}
                style={{ textDecoration: "none", margin: 8 }}
              >
                <Button variant="contained" color="primary">
                  {action.name}
                </Button>
              </Link>
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};
