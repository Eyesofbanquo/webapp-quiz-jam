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
      id={"id"}
      required
      label="Required"
      text={text}
      errorCondition={text.length === 0}
      setText={setText}
      helperText={"For Storybook"}
    />
  );
};

export const TextField = Template.bind({});
