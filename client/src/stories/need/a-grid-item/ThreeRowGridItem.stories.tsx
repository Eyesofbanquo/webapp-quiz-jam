import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import {
  ThreeRowGridItem as Component,
  ThreeRowGridItemProps,
} from "../../../need/a-grid-item/ThreeRowGridItem";
import { Grid, Paper } from "@material-ui/core";

export default {
  title: "Qizzo/Grid Items",
  component: Component,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template: Story<ThreeRowGridItemProps> = (args) => (
  <Component {...args} />
);

export const ThreeRowGridItem = Template.bind({});
ThreeRowGridItem.args = {
  top: "Top Row",
  mid: "Mid Row",
  bot: "Bot Row",
};
ThreeRowGridItem.decorators = [
  (Story) => (
    <Paper style={{ cursor: "pointer", margin: 8, padding: 8, width: 500 }}>
      <Grid>
        <Story />
      </Grid>
    </Paper>
  ),
];
