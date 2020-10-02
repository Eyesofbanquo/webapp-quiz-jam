import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

type Response = {
  haha: string;
};

const App = () => {
  const [data, setData] = useState<Response>();

  const retrieveData = async () => {
    const response = await fetch("/api/welcome");
    const json = (await response.json()) as Response[];

    console.log(json);
    return json[0];
  };

  useEffect(() => {
    retrieveData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <a href="/lol">League of Legends</a>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <div>{data?.haha}</div>
        </Route>
        <Route exact path="/about">
          <h1>About page</h1>
        </Route>
        <Route exact path="/lol">
          <h1>Morde is trash</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
