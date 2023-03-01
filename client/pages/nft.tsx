import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/appContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lqydutonbpotkxpmzlyq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeWR1dG9uYnBvdGt4cG16bHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NjA5NzQsImV4cCI6MTk5MjAzNjk3NH0.st-luSXU6Xo0rzm69y8eLXI-Z8Sb-jEntO19PU5415Y"
);

const Nft = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // value.data.user
        if (value.data?.user) {
          // console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, [user]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="">
      <div>
        <input
          className=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <input
          className="mt-10"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
      </div>
      <button className="btn-green" onClick={btnClick}>
        Create
      </button>
    </div>
  );
};

export default Nft;
