import React, { useState } from "react";
import {
  TextField,
  Snackbar,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Redirect } from "react-router-dom";
import { makeRequest, useMakeRequest } from "../../networking/network";

const SignUpButton: React.FC<{
  onClick: () => void;
  loading: boolean;
  registerSuccess: boolean | undefined;
}> = (props) => {
  return (
    <Grid
      container
      direction="column"
      item
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {props.loading && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      {props.loading === false && props.registerSuccess === false && (
        <Alert severity="error">Error registering. Please try again!</Alert>
      )}
      <Grid item>
        <Button
          id={"login-signup-button"}
          variant="outlined"
          onClick={() => {
            props.onClick();
          }}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export const SignupForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean | undefined>(
    undefined
  );

  if (registerSuccess) {
    return <Redirect to="/login" />;
  }

  return (
    <Grid
      direction="column"
      container
      justify="center"
      alignItems="center"
      xs={12}
      style={{ padding: 16 }}
      spacing={2}
    >
      <Grid item xs={6}>
        <TextField
          required
          id={"signup-username-textfield"}
          helperText={"Input username"}
          label={"username"}
          variant="outlined"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          id={"signup-password-textfield"}
          helperText={"Input password"}
          label={"password"}
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </Grid>
      <SignUpButton
        loading={loading}
        registerSuccess={registerSuccess}
        onClick={() => {
          setLoading(true);
          makeRequest({
            endpoint: "register",
            data: { username: username, password: password },
            service: "auth",
            method: "post",
          })
            .onReceive.then((response) => {
              setLoading(false);
              console.log(response);
              if (response.data.success) {
                setRegisterSuccess(true);
              } else {
                setRegisterSuccess(false);
              }
            })
            .catch((error) => {
              setLoading(false);
              setRegisterSuccess(false);
            });
        }}
      />
    </Grid>
  );
};
