import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext({});

export function AppContextProvider({ children }: any) {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <AppContext.Provider value={{ openAuth, setOpenAuth }}>
      {children}
    </AppContext.Provider>
  );
}
