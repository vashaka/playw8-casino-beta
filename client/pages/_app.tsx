import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AppContextProvider } from "@/context/appContext";
import axios from "axios";

// THIS SHOULD BE CHANGED

axios.defaults.baseURL = "http://localhost:4001";
// axios.defaults.baseURL = "https://vashaka.github.io/server";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
