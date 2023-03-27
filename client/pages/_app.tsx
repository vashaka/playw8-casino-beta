import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AppContextProvider } from "@/context/appContext";
import axios from "axios";

// THIS SHOULD BE CHANGED

axios.defaults.baseURL = "https://playw8-production.up.railway.app:4001";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
