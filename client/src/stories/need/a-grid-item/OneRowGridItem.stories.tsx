import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import {
  OneRowGridItem as Component,
  OneRowGridItemProps,
} from "../../../need/a-grid-item/OneRowGridItem";
import { Grid, Paper } from "@material-ui/core";

export default {
  title: "Qizzo/Grid Items",
  component: Component,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<OneRowGridItemProps> = (args) => <Component {...args} />;

export const OneRowGridItem = Template.bind({});
OneRowGridItem.args = {
  mid: "Mid Row",
};
OneRowGridItem.decorators = [
  (Story) => (
    <Paper style={{ cursor: "pointer", margin: 8, padding: 8, width: 500 }}>
      <Grid>
        <Story />
      </Grid>
    </Paper>
  ),
];
