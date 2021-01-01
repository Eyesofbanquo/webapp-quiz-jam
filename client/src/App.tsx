import React, { useCallback, useReducer, useState, useMemo } from "react";
import { Route, Switch } from "react-router-dom";

import { QuizForm } from "./screens/multiple-choice/MultipleChoiceForm";
import { Nav } from "./views";

import { CategoryList } from "./screens/category/CategoryList";
import { CategoryForm } from "./screens/category/CategoryForm";
import { CreatorForm } from "./screens/creator-mode/CreatorForm";
import { QuestionList } from "./screens/questions/QuestionsList";
import { LoginScreen } from "./screens/login/LoginScreen";

import AuthContext, { AuthContextProps } from "./need/a-context/AuthContext";
import { setRef } from "@material-ui/core";

const AppContent = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/">
        <div>Qizzo</div>
      </Route>
      <Route path="/login">
        <LoginScreen />
      </Route>
      <Route path="/logout"></Route>
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

const tokenReducer = (
  state: {
    accessToken: string;
    refreshToken: string;
  },
  action: { update: "refresh" | "access"; token: string }
) => {
  const tokenToUpdate =
    action.update === "refresh" ? "refreshToken" : "accessToken";
  return { ...state, [tokenToUpdate]: action.token };
};

interface AuthContextObjectProps {
  accessToken: string;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

// const makeAuthContextObject = (props: AuthContextObjectProps) => {
//   const { accessToken, refreshToken, setAccessToken, setRefreshToken } = props;
//   const authObject = useMemo(() => {
//     return {
//       tokens: { accessToken: accessToken, refreshToken: refreshToken },
//       updateToken: (update: "refresh" | "access", token: string) => {
//         if (update === "refresh") {
//           setRefreshToken(token);
//         }
//         if (update === "access") {
//           setAccessToken(token);
//         }
//       },
//     };
//   }, [refreshToken, accessToken]);
// };

const App = () => {
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const authObject = useMemo(() => {
    return {
      tokens: { accessToken: accessToken, refreshToken: refreshToken },
      updateToken: (update: "refresh" | "access", token: string) => {
        if (update === "refresh") {
          setRefreshToken(token);
        }
        if (update === "access") {
          setAccessToken(token);
        }
      },
    };
  }, [refreshToken, accessToken]);
  return (
    <AuthContext.Provider value={authObject}>
      <AppContent />
    </AuthContext.Provider>
  );
};

export default App;
