import { Grid, Button } from "@material-ui/core";
import React from "react";
import { makeRequest } from "../networking/network";

interface DeleteQuestionProps {
  itemName: string;
  onDelete: () => void;
}
export const DeleteItem: React.FC<DeleteQuestionProps> = ({
  itemName,
  onDelete,
}) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: 16 }}
    >
      <h1>Would you like to delete this item?</h1>
      <h3>{itemName}</h3>
      <Button variant="contained" color="secondary" onClick={onDelete}>
        Delete
      </Button>
    </Grid>
  );
};
