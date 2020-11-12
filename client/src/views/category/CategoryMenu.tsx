import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Category } from "../../models/category";
import { GenericMenuList } from "../../need/a-menu/two-part/GenericMenuList";
import { useMakeRequest } from "../../networking/network";

export interface CategoryMenuProps {
  onSelect: (category: Category) => void;
}

interface CategoryRequest {
  success: boolean;
  data: Category[];
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ onSelect }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    request: categoryRequest,
    setRequest: setCategoryRequest,
  } = useMakeRequest<CategoryRequest>({
    endpoint: "categories",
    method: "get",
  });

  useEffect(() => {
    setCategories(categoryRequest?.data ?? []);
  }, [categoryRequest]);

  useEffect(() => {
    onSelect(categories[categoryIndex]);
  }, [categories]);

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
                onSelect(categories[index]);
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
