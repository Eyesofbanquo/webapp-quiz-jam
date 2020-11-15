import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  TextField as Component,
  TextFieldProps,
} from "../../../need/a-textfield/TextField";

export default {
  title: "Qizzo/TextFields",
  component: Component,
  argTypes: { setText: { action: "onChange" } },
} as Meta;

const Template: Story<TextFieldProps> = (args) => {
  const [text, setText] = useState<string>("");
  return (
    <Component
      text={text}
      placeholder={"Placeholder"}
      setText={(text) => {
        setText(text);
      }}
    />
  );
};

export const TextField = Template.bind({});
