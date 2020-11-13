import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { AlertProps, Alert } from "@material-ui/lab";

import { CollapsibleAlert } from "../../../need/an-alert/CollapsibleAlert";

export default {
  title: "Qizzo/Alerts",
  component: CollapsibleAlert,
} as Meta;

interface Props {
  type: AlertProps["severity"];
  text: string;
  showAlert: boolean;
  setShowAlert: (isVisible: boolean) => void;
}

const Template: Story<Props> = (args) => <CollapsibleAlert id="" {...args} />;

let showAlert = false;
export const Info = Template.bind({});
Info.args = {
  type: "info",
  text: "Info",
  showAlert: true,
  setShowAlert: (isVisible) => {},
};

export const Error = Template.bind({});
Error.args = {
  type: "error",
  text: "Error",
  showAlert: true,
  setShowAlert: (isVisible) => {},
};

export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
  text: "Error",
  showAlert: true,
  setShowAlert: (isVisible) => {},
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  text: "Error",
  showAlert: true,
  setShowAlert: (isVisible) => {},
};
