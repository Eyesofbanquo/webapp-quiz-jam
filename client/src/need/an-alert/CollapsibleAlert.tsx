import { Collapse, IconButton } from "@material-ui/core";
import { AlertProps, Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

export const CollapsibleAlert: React.FC<{
  type: AlertProps["severity"];
  text: string;
  showAlert: boolean;
  setShowAlert: (isVisible: boolean) => void;
}> = ({ type, text, showAlert, setShowAlert }) => (
  <Collapse in={showAlert} style={{ margin: "auto" }}>
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setShowAlert(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      style={{ padding: 8, marginTop: 8 }}
      severity={type}
    >
      {text}
    </Alert>
  </Collapse>
);
