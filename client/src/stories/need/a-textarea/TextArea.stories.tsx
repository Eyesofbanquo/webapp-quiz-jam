import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  TextArea as Component,
  TextAreaProps,
} from "../../../need/a-textarea/TextArea";

export default {
  title: "Qizzo/TextAreas",
  component: Component,
  argTypes: { setText: { action: "onChange" } },
} as Meta;

const Template: Story<TextAreaProps> = (args) => {
  const [text, setText] = useState<string>("");
  return (
    <Component
      id={"0"}
      text={text}
      placeholder={"Placeholder"}
      setText={(text) => {
        setText(text);
      }}
    />
  );
};

export const TextArea = Template.bind({});
