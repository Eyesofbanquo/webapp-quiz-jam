import React, { useState } from "react";
import { TextField, Snackbar, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CenteredGrid } from "../../need/a-container/CenteredGrid";

export const SignupForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      <Grid item xs={6}>
        <Button
          id={"login-signup-button"}
          variant="outlined"
          onClick={() => {}}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};
