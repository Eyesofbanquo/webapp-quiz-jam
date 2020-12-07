import React from "react";
import { Route, Switch } from "react-router-dom";

import { QuizForm } from "./screens/multiple-choice/MultipleChoiceForm";
import { Nav } from "./views";

import { CategoryList } from "./screens/category/CategoryList";
import { CategoryForm } from "./screens/category/CategoryForm";
import { CreatorForm } from "./screens/creator-mode/CreatorForm";
import { QuestionList } from "./screens/questions/QuestionsList";
import { LoginScreen } from "./screens/login/LoginScreen";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <div>Qizzo</div>
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/about">
          <h1>About page</h1>
        </Route>
        <Route exact path="/creator">
          <CreatorForm />
        </Route>
        <Route exact path="/create-quiz">
          <QuizForm />
        </Route>
        <Route exact path="/create-category">
          <CategoryForm />
        </Route>
        <Route exact path="/categories">
          <CategoryList />
        </Route>
        <Route exact path="/questions">
          <QuestionList />
        </Route>
        <Route
          component={() => <h3 style={{ padding: 8 }}>404 - Not Found</h3>}
        />
      </Switch>
    </div>
  );
};

export default App;
