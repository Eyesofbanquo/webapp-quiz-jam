import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => (
  <AppBar className={"nav"} position="static">
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
        to="/creator"
      >
        <Typography variant="h6">Creator Mode</Typography>
      </Link>
    </Toolbar>
  </AppBar>
);
