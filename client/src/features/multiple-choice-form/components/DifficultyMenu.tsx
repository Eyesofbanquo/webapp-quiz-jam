import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

export const DifficultyMenu: React.FC<{
  difficulty: string[];
  difficultyIndex: number;
  setDifficultyIndex: (difficulty: number) => void;
}> = ({ difficulty, difficultyIndex, setDifficultyIndex }) => {
  const [anchorElement, setAnchorElement] = useState(null);

  return (
    <>
      <List component="nav">
        <ListItem
          button
          onClick={(event) => {
            setAnchorElement(event.currentTarget as any);
          }}
        >
          <ListItemText
            primary="Chose your difficulty"
            secondary={difficulty[difficultyIndex]}
          />
        </ListItem>
      </List>

      <Menu
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        keepMounted
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        {difficulty.map((difficulty, index) => {
          return (
            <MenuItem
              key={difficulty}
              selected={index === difficultyIndex}
              onClick={(event) => {
                setDifficultyIndex(index);
                setAnchorElement(null);
              }}
            >
              {difficulty}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
