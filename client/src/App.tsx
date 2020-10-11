import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { QuizForm } from "./features/multiple-choice-form/MultipleChoiceForm";
import { Nav } from "./components";
import { QuestionList } from "./features/questions/QuestionsList";
import { CategoryList } from "./features/category/CategoryList";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <div>Qizzo</div>
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
        <Route exact path="/category">
          <CategoryList />
        </Route>
        <Route
          component={() => <h3 style={{ padding: 8 }}>404 - Not Found</h3>}
        />
      </Switch>
    </div>
  );
};

export default App;
