import { Grid, Button } from "@material-ui/core";
import React from "react";
import { MultipleChoiceQuestion } from "../features/questions/QuestionCard";
import { makeRequest } from "../networking/network";

interface DeleteQuestionProps {
  itemName: string;
  onDelete: () => void;
}

interface PayloadType {
  key: string;
  value: string;
}

export interface Deletable {
  id: string;
}

export async function deleteItem<T extends Deletable>(
  items: T[],
  selectedItem: T,
  endpoint: "multiple" | "categories",
  payload: { key: string; value: string }
) {
  let filteredItems: T[] = [];
  await makeRequest({
    endpoint: endpoint,
    method: "delete",
    data: {
      [payload.key]: payload.value,
    },
  }).onReceive.then((response) => {
    if (response.data.success) {
      filteredItems = items.filter(
        (savedItem) => savedItem.id !== selectedItem.id
      );
    }
  });
  return {
    filteredItems: filteredItems,
  };
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
