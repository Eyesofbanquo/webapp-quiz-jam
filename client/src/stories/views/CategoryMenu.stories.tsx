import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import {
  CategoryMenu as Component,
  CategoryMenuProps,
} from "../../views/category/CategoryMenu";

export default {
  title: "Qizzo/Views",
  component: Component,
} as Meta;

const Template: Story<CategoryMenuProps> = (args) => <Component {...args} />;

export const CategoryMenu = Template.bind({});
CategoryMenu.args = {
  onSelect: (category) => {},
};
