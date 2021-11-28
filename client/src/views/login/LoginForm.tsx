import React, { useState, useContext } from "react";
import {
  TextField,
  Snackbar,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CenteredGrid } from "../../need/a-container/CenteredGrid";
import { Redirect } from "react-router-dom";
import { makeRequest } from "../../networking/network";
import AuthContext from "../../need/a-context/AuthContext";

const LoginButton: React.FC<{
  id: string;
  onClick: () => void;
  loading: boolean;
  loginSuccess: boolean | undefined;
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
      {props.loading === false && props.loginSuccess === false && (
        <Alert severity="error">Error registering. Please try again!</Alert>
      )}
      <Grid item>
        <Button
          id={props.id}
          variant="outlined"
          onClick={() => {
            props.onClick();
          }}
        >
          Sign In
        </Button>
      </Grid>
    </Grid>
  );
};

export const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(
    undefined
  );

  const authContext = useContext(AuthContext);

  if (loginSuccess) {
    return <Redirect to="/creator" />;
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
          id={"login-username-textfield"}
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
          id={"login-password-textfield"}
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
      <Grid item xs={6}>
        <LoginButton
          id={"login-auth-login-button"}
          loading={loading}
          loginSuccess={loginSuccess}
          onClick={() => {
            setLoading(true);
            makeRequest({
              endpoint: "login",
              data: { username: username, password: password },
              service: "auth",
              method: "post",
            })
              .onReceive.then((response) => {
                console.log(response);
                console.log(
                  process.env.NODE_ENV,
                  process.env.REACT_APP_AUTH_SERVICE_URI
                );
                setLoading(false);
                if (response.data.success) {
                  localStorage.setItem(
                    "accessToken",
                    response.data.data.accessToken
                  );
                  localStorage.setItem(
                    "refreshToken",
                    response.data.data.refreshToken
                  );
                  authContext?.updateToken(
                    "access",
                    response.data.data.accessToken
                  );
                  authContext?.updateToken(
                    "refresh",
                    response.data.data.refreshToken
                  );
                  setLoginSuccess(true);
                } else {
                  setLoginSuccess(false);
                }
              })
              .catch((error) => {
                setLoading(false);
                setLoginSuccess(false);
              });
          }}
        />
      </Grid>
    </Grid>
  );
};
