import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Le Context

export const AuthContext = createContext();

// Le Provider
export default function AuthContextProvider({ children }) {
  const [userID, setUserID] = useState("");
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        const storedUserID = await AsyncStorage.getItem("userID");

        if (storedToken && storedUserID) {
          setUserToken(storedToken);
          setUserID(storedUserID);
        }
      } catch (error) {
        console.log("Error loading auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (token, id) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userID", String(id));
    } catch (error) {
      console.log("Error saving auth data:", error);
    }

    setUserToken(token);
    setUserID(id);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userID");
    } catch (error) {
      console.log("Error removing auth data:", error);
    }

    setUserToken("");
    setUserID("");
  };

  return (
    <AuthContext.Provider
      value={{ userID, userToken, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
