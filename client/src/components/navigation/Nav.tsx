import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => (
  <AppBar position="static">
    <Toolbar>
      <Link
        style={{ textDecoration: "none", padding: 16, color: "white" }}
        to="/"
      >
        <Typography variant="h3">Qizzo Builder</Typography>{" "}
      </Link>
      <Link
        style={{ textDecoration: "none", padding: 16, color: "white" }}
        to="/about"
      >
        <Typography variant="h6">About</Typography>
      </Link>
      <Link
        style={{ textDecoration: "none", padding: 16, color: "white" }}
        to="/form"
      >
        <Typography variant="h6">Create a question</Typography>
      </Link>
      <Link
        style={{ textDecoration: "none", padding: 16, color: "white" }}
        to="/questions"
      >
        <Typography variant="h6">All Questions</Typography>
      </Link>
    </Toolbar>
  </AppBar>
);
