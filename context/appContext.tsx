import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export function AppContextProvider({ children }: any) {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <AppContext.Provider value={{ openAuth, setOpenAuth }}>
      {children}
    </AppContext.Provider>
  );
}
