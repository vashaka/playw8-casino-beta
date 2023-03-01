import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="absolute md:relative ml-0 mr-0 left-0 px-2 md:px-0">
      <Header />
      <Navbar />
      <main className="md:mx-20 py-4 w-full md:w-[90%]">{children}</main>
    </div>
  );
};

export default Layout;
