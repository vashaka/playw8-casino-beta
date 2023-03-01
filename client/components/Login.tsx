import { useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import { AppContext } from "../context/appContext";

const supabase = createClient(
  "https://lqydutonbpotkxpmzlyq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeWR1dG9uYnBvdGt4cG16bHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NjA5NzQsImV4cCI6MTk5MjAzNjk3NH0.st-luSXU6Xo0rzm69y8eLXI-Z8Sb-jEntO19PU5415Y"
);

const Login = () => {
  const { setOpenAuth }: any = useContext(AppContext);
  const router = useRouter();

  supabase.auth.onAuthStateChange(async (event, err) => {
    if (event !== "SIGNED_OUT") {
      router.push("/");
    } else {
      router.push("/afafwaf");
    }
  });
  return (
    <>
      <div
        onClick={() => setOpenAuth(false)}
        className="w-full h-screen bg-black opacity-70 absolute left-0 right-0 top-0 bottom-0 z-50"
      ></div>
      <div
        className={`p-6 w-full max-w-[30rem] h-auto bg-[#20242d] rounded-xl absolute top-1/2 left-1/2 z-50 ${"card"} text-center`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>Login</h1>
        <Auth
          onlyThirdPartyProviders={true}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord"]}
        />
      </div>
    </>
  );
};

export default Login;
