import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";

export const GenericMenuList: React.FC<{
  id?: string;
  title: string;
  subtitle: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ title, subtitle, onClick, id }) => {
  return (
    <List component="nav">
      <ListItem button onClick={onClick} id={id}>
        <ListItemText primary={title} secondary={subtitle} />
      </ListItem>
    </List>
  );
};
