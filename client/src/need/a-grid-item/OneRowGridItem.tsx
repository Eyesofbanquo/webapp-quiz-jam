import { Grid, Typography } from "@material-ui/core";
import React from "react";

export interface OneRowGridItemProps {
  mid: string;
}

export const OneRowGridItem: React.FC<OneRowGridItemProps> = ({ mid }) => {
  return (
    <Grid item>
      <Typography variant="subtitle1">{mid}</Typography>
    </Grid>
  );
};
