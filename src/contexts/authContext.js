import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import * as commonServices from "../services/commonServices";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken] = useLocalStorage("dataUser", "");
  const [dataUser, setDataUser] = useState(null);

  const decodeToken = async () => {
    try {
      if (!accessToken?.token) return;

      const response = await commonServices.handleDecoded(accessToken.token);
      if (response?.errCode === 0) {
        setDataUser(response.decoded);
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  useEffect(() => {
    if (!accessToken?.token || dataUser) return;

    const intervalId = setInterval(() => {
      decodeToken();
    }, 500);

    if (dataUser) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [accessToken, dataUser]);

  return (
    <AuthContext.Provider value={{ dataUser, setDataUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
