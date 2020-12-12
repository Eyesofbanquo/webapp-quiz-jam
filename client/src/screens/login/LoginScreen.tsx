import React, { useState } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { LoginForm } from "../../views/login/LoginForm";

export const LoginScreen = () => {
  let match = useRouteMatch();
  return (
    <Container>
      <Switch>
        <Route exact path={`${match.path}`}>
          <LoginForm url={match.url} />
        </Route>
        <Route path={`${match.path}/auth`}>
          <div>The page for the login buttons and tools</div>
        </Route>
        <Route path={`${match.path}/signup`}>
          <div>The page for the signup buttons and tools</div>
        </Route>
      </Switch>
    </Container>
  );
};
