import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Category } from "../../models/category";
import { GenericMenuList } from "../../need/a-menu/two-part/GenericMenuList";

export const CategoryMenu: React.FC<{
  categories: Category[];
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
}> = ({ categories, categoryIndex, setCategoryIndex }) => {
  const [anchorElement, setAnchorElement] = useState(null);

  return (
    <>
      <GenericMenuList
        title={"Choose your category"}
        subtitle={categories[categoryIndex]?.name}
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
        {categories.map((category, index) => {
          return (
            <MenuItem
              key={category?.id}
              selected={index === categoryIndex}
              onClick={(event) => {
                setCategoryIndex(index);
                setAnchorElement(null);
              }}
            >
              {category?.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
