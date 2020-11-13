import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GenericMenuList } from "../need/a-menu/two-part/GenericMenuList";
import { useMakeRequest } from "../networking/network";

export interface DifficultyMenuProps {
  onSelect: (difficulty: string) => void;
}

interface DifficultyRequest {
  success: boolean;
  data: string[];
}

export const DifficultyMenu: React.FC<DifficultyMenuProps> = ({ onSelect }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [difficultyIndex, setDifficultyIndex] = useState(0);
  const [difficulty, setDifficulty] = useState<string[]>([]);

  const { request: difficultyRequest } = useMakeRequest<DifficultyRequest>({
    endpoint: "difficulty",
    method: "get",
  });

  useEffect(() => {
    setDifficulty(difficultyRequest?.data ?? []);
  }, [difficultyRequest]);

  useEffect(() => {
    onSelect(difficulty[difficultyIndex]);
  }, [difficulty]);

  return (
    <>
      <GenericMenuList
        id={"choose-difficulty-menu"}
        title={"Choose a difficulty"}
        subtitle={difficulty[difficultyIndex]}
        onClick={(event) => {
          setAnchorElement(event.currentTarget as any);
        }}
      />

      <Menu
        id={"choose-difficulty-submenu"}
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
              id={`${index}-submenu-item`}
              key={difficulty}
              selected={index === difficultyIndex}
              onClick={(event) => {
                setDifficultyIndex(index);
                onSelect(difficulty);
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
