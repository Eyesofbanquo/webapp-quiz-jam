import React, { useEffect, useState } from "react";
import { makeRequest } from "../../networking/network";
import { Category } from "./category";
import { Grid, Paper, Typography } from "@material-ui/core";

export const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const onReceive = makeRequest({
      endpoint: "categories",
      method: "get",
    }).onReceive;

    onReceive.then((results) => {
      setCategories(results.data);
    });
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      style={{ padding: 8 }}
    >
      <Grid item>
        <Typography variant="h4">Categories</Typography>
      </Grid>
      {categories.map((category) => (
        <Grid item key={category.id}>
          <Paper style={{ margin: 8, width: 500, padding: 16 }}>
            {category.name}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
