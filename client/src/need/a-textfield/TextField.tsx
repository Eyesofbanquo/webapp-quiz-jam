import { Card, TextField as Field } from "@material-ui/core";
import React from "react";

export interface TextFieldProps {
  id?: string;
  required: boolean;
  label: string;
  text: string;
  setText: (text: string) => void;
  errorCondition: boolean;
  helperText: string;
  additionalProps?: {};
}
//        data-correct={isCorrectChoice ? "correct" : "incorrect"}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  required,
  text,
  setText,
  errorCondition,
  helperText,
  additionalProps,
}) => {
  return (
    <Card style={{ padding: 16, borderRadius: 8, margin: 4 }}>
      <Field
        id={id}
        style={{ width: "100%" }}
        required
        label={label}
        value={text}
        error={errorCondition}
        onChange={(event) => {
          setText(event.target.value);
        }}
        helperText={helperText}
        {...additionalProps}
      />
    </Card>
  );
};
