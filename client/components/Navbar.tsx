import React from "react";
import Image from "next/image";
import crackIt from "../data/Asset 15.png";
import quest from "../data/Asset 16.png";

const Navbar = () => {
  return (
    <div className="hidden md:flex fixed bg-[#0F0114] px-8 py-4 h-[92%] w-auto flex-col">
      <div
        className="pt-6 w-[60px] cursor-pointer"
        onClick={() => (window.location = "/case")}
      >
        <Image
          src={crackIt}
          alt="image"
          className=""
          width={100}
          height={0}
          layout="responsive"
          placeholder="blur"
        />
      </div>
      <div className="pt-6 w-[60px]">
        <Image
          src={quest}
          alt="image"
          className=""
          width={100}
          height={0}
          layout="responsive"
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default Navbar;
