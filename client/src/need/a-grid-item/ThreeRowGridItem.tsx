import { Grid, Typography } from "@material-ui/core";
import React from "react";

export interface ThreeRowGridItemProps {
  top: string;
  mid: string;
  bot: string;
}

export const ThreeRowGridItem: React.FC<ThreeRowGridItemProps> = ({
  top,
  mid,
  bot,
}) => (
  <Grid item xs container direction="column" spacing={2}>
    <Grid item xs>
      <Typography gutterBottom variant="subtitle1">
        {top}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {mid}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {bot}
      </Typography>
    </Grid>
  </Grid>
);
