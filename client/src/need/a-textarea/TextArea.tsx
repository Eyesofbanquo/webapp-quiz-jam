import { Paper, TextareaAutosize } from "@material-ui/core";
import React from "react";

export interface TextFieldProps {
  id: string;
  placeholder: string;
  text: string;
  setText: (text: string) => void;
}

export const TextArea: React.FC<TextFieldProps> = ({
  id,
  placeholder,
  text,
  setText,
}) => {
  return (
    <Paper style={{ padding: 16, borderRadius: 8, margin: 4 }}>
      <TextareaAutosize
        id={id}
        style={{ width: "100%" }}
        aria-label="minimum height"
        rowsMin={3}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        placeholder={placeholder}
      />
    </Paper>
  );
};
