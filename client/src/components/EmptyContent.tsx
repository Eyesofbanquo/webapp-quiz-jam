import { Grid } from "@material-ui/core";
import React from "react";

export const EmptyContent: React.FC<{ itemType: string }> = ({ itemType }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: 16 }}
    >
      <h1>No {itemType} exist yet :(</h1>
    </Grid>
  );
};
