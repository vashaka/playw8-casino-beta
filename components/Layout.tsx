import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="md:mx-20 py-4 w-full md:w-[90%]">{children}</main>
    </div>
  );
};

export default Layout;
