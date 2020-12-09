import React, { useState } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";

const LoginForm = () => (
  <Container maxWidth="lg">
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <div id={"login-description"}>
          <Typography variant="h3">
            Welcome to the admin page for the <b>Quizzo</b> builder
          </Typography>
        </div>
        <Button
          style={{ marginTop: 16 }}
          id={"login-screen-signup-button"}
          variant="contained"
          color="primary"
          onClick={(event) => {
            console.log(event, "Login");
          }}
        >
          Login
        </Button>
        <Button
          style={{ marginTop: 16 }}
          id={"login-screen-login-button"}
          variant="contained"
          color="primary"
          onClick={(event) => {
            console.log(event, "Sign up");
          }}
        >
          Sign up
        </Button>
      </Grid>
    </div>
  </Container>
);

export const LoginScreen = () => {
  return <LoginForm />;
};
