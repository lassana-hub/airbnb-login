import { createContext } from "react";
import { useState } from "react";

// Le Context

export const AuthContext = createContext();

// Le Provider
export default function AuthContextProvider({ children }) {
  const [userID, setUserID] = useState("");
  const [userToken, setUserToken] = useState(null);

  const login = (token, id) => {
    setUserToken(token);
    setUserID(id);
  };
  const logout = () => {
    setUserToken(false);
  };

  return (
    <AuthContext.Provider
      value={{ userID, setUserID, userToken, setUserToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
