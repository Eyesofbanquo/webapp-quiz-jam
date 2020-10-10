import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { QuizForm } from "./features/multiple-choice-form/MultipleChoiceForm";
import { Nav } from "./components";
import { HahaCall } from "./network/hahaCall";
import { QuestionList } from "./features/questions/QuestionsList";

const App = () => {
  const data = HahaCall();

  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <div>{data?.hahaData?.haha}</div>
        </Route>
        <Route exact path="/about">
          <h1>About page</h1>
        </Route>
        <Route exact path="/lol">
          <h1>Morde is trash</h1>
        </Route>
        <Route exact path="/questions">
          <QuestionList />
        </Route>
        <Route exact path="/form">
          <QuizForm />
        </Route>
        <Route
          component={() => <h3 style={{ padding: 8 }}>404 - Not Found</h3>}
        />
      </Switch>
    </div>
  );
};

export default App;
