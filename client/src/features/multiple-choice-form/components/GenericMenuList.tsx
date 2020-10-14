import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

export const GenericMenuList: React.FC<{
  title: string;
  subtitle: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ title, subtitle, onClick }) => {
  return (
    <List component="nav">
      <ListItem button onClick={onClick}>
        <ListItemText primary={title} secondary={subtitle} />
      </ListItem>
    </List>
  );
};
