import React, { useContext } from "react";
import { AppContext } from "../context/appContext";

const Header = () => {
  const { setOpenAuth }: any = useContext(AppContext);

  return (
    <div
      className="p-4 flex justify-between items-center border-b border-[hsl(222,17%,18%)]"
      style={{
        whiteSpace: "nowrap",
      }}
    >
      <div className="flex items-center">
        <h1 className="text-3xl text-white">
          play <span className="bg-[#4180f1] rounded-md px-1 py-0">2x</span>
        </h1>
        <div className="flex items-center px-2 text-sm">
          <p className="px-2 text-[#828f9a]">Games</p>
          <p className="px-2 text-[#828f9a]">Referalls</p>
          <p className="px-2 text-[#828f9a]">Bonuses</p>
          <p className="px-2 text-[#828f9a]">Vip Club</p>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => setOpenAuth(true)}
          className="mr-2 text-[#828f9a] bg-[#20242d] px-6 py-2 rounded-sm border text-sm border-[hsla(0,0%,100%,.08)]"
        >
          Log in
        </button>
        <button
          onClick={() => setOpenAuth(true)}
          className="bg-[#4180f1] px-6 py-2 rounded-sm text-sm text-white border-[hsla(0,0%,100%,.08)]"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Header;
