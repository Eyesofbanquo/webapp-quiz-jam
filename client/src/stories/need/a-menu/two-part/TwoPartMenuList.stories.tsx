import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { GenericMenuList } from "../../../../need/a-menu/two-part/GenericMenuList";

export default {
  title: "Qizzo/Menus",
  component: GenericMenuList,
} as Meta;

interface Props {
  title: string;
  subtitle: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Template: Story<Props> = (args) => <GenericMenuList {...args} />;

export const TwoPartMenuList = Template.bind({});
TwoPartMenuList.args = {
  title: "Title",
  subtitle: "Subtitle",
  onClick: (event) => {},
};
