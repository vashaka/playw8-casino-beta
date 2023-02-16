import React, { useEffect, useState, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import Login from "../components/Login";
import { AppContext } from "../context/appContext";

const inter = Inter({ subsets: ["latin"] });

const supabase = createClient(
  "https://lqydutonbpotkxpmzlyq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeWR1dG9uYnBvdGt4cG16bHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NjA5NzQsImV4cCI6MTk5MjAzNjk3NH0.st-luSXU6Xo0rzm69y8eLXI-Z8Sb-jEntO19PU5415Y"
);

export default function Home() {
  const { openAuth, setOpenAuth }: any = useContext(AppContext);
  const [user, setUser] = useState<any>();

  const router = useRouter();

  async function signoutUser() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
    setUser(null);
  }
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
  }, []);
  return (
    <div className="md:grid md:grid-cols-2 w-full text-">
      <div className="px-10 py-2 text-center md:text-left">
        <h1>Hello {user?.user_metadata?.full_name}</h1>
        <h1>Play2x - Smart Casino</h1>
        <p className="text-[#828f9a] mt-1 text-md">
          Unique games with cash withdrawal <br /> and an RNG certificate
        </p>
        <p className="text-[#828f9a] mt-20">
          DAILY BONUS, RAKEBACK AND LOTS MORE
        </p>
        {!user ? (
          <button onClick={() => setOpenAuth(true)} className="btn-green">
            SIGN UP IN ONE CLICK
          </button>
        ) : (
          <button onClick={signoutUser} className="btn-green">
            Sign Out
          </button>
        )}
      </div>
      <div>
        <img
          src="https://csgobooks.com/wp-content/uploads/play2x.png"
          alt="image"
          className="w-[90%] h-[90%]"
        />
      </div>
      {openAuth && <Login />}
    </div>
  );
}
