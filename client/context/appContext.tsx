import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext({});
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lqydutonbpotkxpmzlyq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeWR1dG9uYnBvdGt4cG16bHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NjA5NzQsImV4cCI6MTk5MjAzNjk3NH0.st-luSXU6Xo0rzm69y8eLXI-Z8Sb-jEntO19PU5415Y"
);

export function AppContextProvider({ children }: any) {
  const [openAuth, setOpenAuth] = useState(false);
  const [user, setUser] = useState<any>();
  const [mongodbUser, setMongodbUser] = useState();

  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(localStorage.getItem("user"));

    if (userId && user && !mongodbUser) {
      axios
        .post("/getUser", {
          userId,
        })
        .then((resp) => {
          setMongodbUser(resp.data?.user);
        });
    }
  }, [userId, mongodbUser, user]);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // value.data.user
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        openAuth,
        setOpenAuth,
        user,
        setUser,
        mongodbUser,
        setMongodbUser,
        userId,
        setUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
