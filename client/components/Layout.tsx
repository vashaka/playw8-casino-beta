import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();
  return (
    <div className="">
      <Header />
      <div className="mt-[80px]">
        <Navbar />
        <main className="md:mx-28 py-4 w-full md:w-[94%] z-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
