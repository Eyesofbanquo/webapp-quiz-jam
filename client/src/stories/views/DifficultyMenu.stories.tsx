import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import {
  DifficultyMenu as Menu,
  DifficultyMenuProps,
} from "../../views/DifficultyMenu";

export default {
  title: "Qizzo/Views",
  component: Menu,
} as Meta;

const Template: Story<DifficultyMenuProps> = (args) => <Menu {...args} />;

export const DifficultyMenu = Template.bind({});
DifficultyMenu.args = {
  onSelect: (difficulty) => {},
};
