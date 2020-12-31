import React, { createContext } from "react";

export interface AuthContextProps {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  updateToken: (update: "refresh" | "access", token: string) => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
