import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { GenericMenuList } from "./GenericMenuList";

const MenuContent: React.FC<{
  difficulty: string[];
  difficultyIndex: number;
  setDifficultyIndex: (difficulty: number) => void;
  setAnchorElement: React.Dispatch<React.SetStateAction<null>>;
}> = ({
  difficulty,
  difficultyIndex,
  setDifficultyIndex,
  setAnchorElement,
}) => (
  <>
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
  </>
);

export const DifficultyMenu: React.FC<{
  difficulty: string[];
  difficultyIndex: number;
  setDifficultyIndex: (difficulty: number) => void;
}> = ({ difficulty, difficultyIndex, setDifficultyIndex }) => {
  const [anchorElement, setAnchorElement] = useState(null);

  return (
    <>
      <GenericMenuList
        title={"Choose your difficulty"}
        subtitle={difficulty[difficultyIndex]}
        onClick={(event) => {
          setAnchorElement(event.currentTarget as any);
        }}
      />

      <Menu
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        keepMounted
        onClose={() => {
          setAnchorElement(null);
        }}
      >
        <MenuContent
          difficulty={difficulty}
          difficultyIndex={difficultyIndex}
          setDifficultyIndex={setDifficultyIndex}
          setAnchorElement={setAnchorElement}
        />
      </Menu>
    </>
  );
};
