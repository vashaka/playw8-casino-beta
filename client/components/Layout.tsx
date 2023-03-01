import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Image from "next/image";
import backg from "../data/Asset 11.png";

const Layout = ({ children }: any) => {
  return (
    <div className="absolute md:relative ml-0 mr-0 left-0 px-2 md:px-0">
      <Header />
      <div className="mt-[80px]">
        <Navbar />
        <div className="absolute z-[-10] opacity-20 left-0 right-0">
          <Image
            src={backg}
            alt="image"
            className="z-0"
            width={100}
            height={0}
            layout="responsive"
            placeholder="blur"
          />
        </div>
        <main className="md:mx-20 py-4 w-full md:w-[95%] z-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
