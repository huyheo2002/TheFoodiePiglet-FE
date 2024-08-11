import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import * as commonServices from "../services/commonServices"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken] = useLocalStorage("dataUser", "");
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    const decodeToken = async () => {
      if (accessToken) {
        const respon = await commonServices.handleDecoded(accessToken.token);
        if (respon && respon.errCode === 0) {
          setDataUser(respon.decoded);
        }
      }
    };

    decodeToken();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ dataUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
