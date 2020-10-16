import React, { useEffect, useState } from "react";
import { useMakeRequest } from "../../networking/network";
import { Category } from "./category";
import { Grid, Paper, Typography } from "@material-ui/core";
import { DeleteItem } from "../../components/DeleteItem";
import { deleteRequest } from "../../components/deleteItem.helper";

export const CategoryList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { request: categories, setRequest: setCategories } = useMakeRequest<
    Category[]
  >({
    endpoint: "categories",
    method: "get",
  });

  if (selectedCategory) {
    return (
      <DeleteItem
        itemName={selectedCategory.name}
        onDelete={() => {
          deleteRequest<Category>({
            items: categories ?? [],
            selectedItem: selectedCategory,
            endpoint: "categories",
          }).then((result) => {
            setCategories(result.filteredItems);
            setSelectedCategory(undefined);
          });
        }}
      />
    );
  }
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      style={{ padding: 8 }}
    >
      <Grid item>
        <Typography variant="h4">Categories</Typography>
      </Grid>
      {categories?.map((category) => (
        <Grid item key={category.id}>
          <Paper
            style={{ margin: 8, width: 500, padding: 16 }}
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {category.name}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
