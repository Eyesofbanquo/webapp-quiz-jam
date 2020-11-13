import { Grid, Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

interface Item {
  name: string;
  actions: { name: string; endpoint: string; id: string }[];
}
const items: Item[] = [
  {
    name: "Category",
    actions: [
      { name: "Show Categories", endpoint: "/categories", id: "show-category" },
      {
        name: "Create a Category",
        endpoint: "/create-category",
        id: "create-category",
      },
    ],
  },
  {
    name: "Question",
    actions: [
      { name: "Show Questions", endpoint: "/questions", id: "show-questions" },
      {
        name: "Create a Question",
        endpoint: "/create-quiz",
        id: "create-question",
      },
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
                id={`${action.id.toLowerCase()}-button`}
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
