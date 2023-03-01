import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const url = router.pathname;
  const { setOpenAuth, user }: any = useContext(AppContext);

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
          <Link
            href={"/"}
            className={`px-2 ${
              url === "/"
                ? "text-white bg-[hsl(213,23%,25%)] rounded-sm px-2 py-1"
                : "text-[#828f9a]"
            }`}
          >
            Main
          </Link>
          <Link
            href={"/Referalls"}
            className={`px-2 ${
              url === "/Referalls"
                ? "text-white bg-[hsl(213,23%,25%)] rounded-sm px-2 py-1"
                : "text-[#828f9a]"
            }`}
          >
            Referalls
          </Link>
          <Link
            href={"/Bonuses"}
            className={`px-2 ${
              url === "/Bonuses"
                ? "text-white bg-[hsl(213,23%,25%)] rounded-sm px-2 py-1"
                : "text-[#828f9a]"
            }`}
          >
            Bonuses
          </Link>
          <Link
            href={"/Vip-Club"}
            className={`px-2 ${
              url === "/Vip-Club"
                ? "text-white bg-[hsl(213,23%,25%)] rounded-sm px-2 py-1"
                : "text-[#828f9a]"
            }`}
          >
            Bonuses
          </Link>
        </div>
      </div>
      <div className="">
        {/* <button
          onClick={() => setOpenAuth(true)}
          className="mr-2 text-[#828f9a] bg-[#20242d] px-6 py-2 rounded-sm border text-sm border-[hsla(0,0%,100%,.08)]"
        >
          Log in
        </button> */}
        {!user ? (
          <button
            onClick={() => setOpenAuth(true)}
            className="bg-[#4180f1] px-6 py-2 rounded-sm text-sm text-white border-[hsla(0,0%,100%,.08)]"
          >
            Sign up
          </button>
        ) : (
          <p className="text-white">{user.email.slice(0, 12)}...</p>
        )}
      </div>
    </div>
  );
};

export default Header;
