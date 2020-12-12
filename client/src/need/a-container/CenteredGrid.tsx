import React from "react";
import { styled } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export const CenteredGrid: React.FC = ({ children }) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      xs={12}
      style={{ padding: 16 }}
    >
      {children}
    </Grid>
  );
};
