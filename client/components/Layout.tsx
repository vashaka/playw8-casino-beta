import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Image from "next/image";
import backg from "../data/Asset 11.png";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="">
      <Header />
      <div className="mt-[80px]">
        <Navbar />
        <div
          className={`bg-[#141823] absolute z-[-10] ${
            path === "/case" ? "opacity-20" : "opaciity-100"
          } left-0 right-0`}
        >
          <Image
            src={backg}
            alt="image"
            className="z-[-10] h-[200%]"
            width={100}
            height={0}
            layout="responsive"
            placeholder="blur"
          />
        </div>
        <main className="md:mx-28 py-4 w-full md:w-[94%] z-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
