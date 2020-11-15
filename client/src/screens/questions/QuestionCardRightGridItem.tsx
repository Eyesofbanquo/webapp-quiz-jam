import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

export interface QuestionCardRightGridItemProps {
  in_review: boolean;
}

const useStyles = makeStyles((theme) => ({
  rightGrid: {
    fontWeight: "bold",
  },
}));

export const QuestionCardRightGridItem: React.FC<QuestionCardRightGridItemProps> = ({
  in_review,
}) => {
  const theme = useStyles();
  return (
    <Grid item>
      <Typography variant="subtitle1" className={theme.rightGrid}>
        {in_review ? "In Review" : "Reviewed"}
      </Typography>
    </Grid>
  );
};
