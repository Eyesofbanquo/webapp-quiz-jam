import React from "react";
import { Container, Button, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export const AuthForm = (props: { url: string }) => {
  return (
    <Container maxWidth="lg">
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <div id={"login-description"}>
            <Typography variant="h3">
              Welcome to the admin page for the <b>Quizzo</b> builder
            </Typography>
          </div>
          <Link to={`${props.url}/auth`}>
            <Button
              style={{ marginTop: 16 }}
              id={"login-screen-signup-button"}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Link>

          <Link to={`${props.url}/signup`}>
            <Button
              style={{ marginTop: 16 }}
              id={"login-screen-login-button"}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </Link>
        </Grid>
      </div>
    </Container>
  );
};
