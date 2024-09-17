import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import * as commonServices from "../services/commonServices";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken] = useLocalStorage("dataUser", "");
  const [dataUser, setDataUser] = useState(null);
  const [isDecoded, setIsDecoded] = useState(false);

  const decodeToken = async () => {
    try {
      const respon = await commonServices.handleDecoded(accessToken.token);
      if (respon?.errCode === 0) {
        setDataUser(respon.decoded);
        setIsDecoded(true);
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  useEffect(() => {
    if (!accessToken || isDecoded || dataUser !== null) return;
    decodeToken();
  }, [accessToken, dataUser, isDecoded]);

  return (
    <AuthContext.Provider value={{ dataUser, setDataUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
