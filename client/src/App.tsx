import React, { useState, useEffect } from "react";
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

  return <div>{data?.haha}</div>;
};

export default App;
