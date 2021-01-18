import React, { useContext, useState } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { AuthForm } from "../../views/login/AuthForm";
import { SignupForm } from "../../views/login/SignupForm";
import { LoginForm } from "../../views/login/LoginForm";
import AuthContext from "../../need/a-context/AuthContext";

export const LoginScreen = () => {
  let match = useRouteMatch();
  const authContext = useContext(AuthContext);
  console.log(authContext?.tokens.accessToken);
  return (
    <Container>
      <Switch>
        <Route exact path={`${match.path}`}>
          <AuthForm url={match.url} />
        </Route>
        <Route path={`${match.path}/auth`}>
          <LoginForm />
        </Route>
        <Route path={`${match.path}/signup`}>
          <SignupForm />
        </Route>
      </Switch>
    </Container>
  );
};
