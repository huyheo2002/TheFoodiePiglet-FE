import { createContext, useContext, useState } from "react";

const MenuSelectedContext = createContext(null);

export const MenuSelectedProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(1);
  return (
    <MenuSelectedContext.Provider value={{
        currentCategory, setCurrentCategory
    }}>
      {children}
    </MenuSelectedContext.Provider>
  );
};

export const useMenuSelected = () => useContext(MenuSelectedContext);
