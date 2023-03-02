import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../data/Asset 2.png";
import whiteList from "../data/Asset 3.png";
import Discord from "../data/Asset 4.png";
import Twitt from "../data/Asset 5.png";
import signUp from "../data/Asset 6.png";
import stick from "../data/Asset 7.png";
import logIn from "../data/Asset 8.png";
import prof from "../data/Asset 9.png";

import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const url = router.pathname;
  const { setOpenAuth, user }: any = useContext(AppContext);

  return (
    <div
      className="z-20"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        margin: "auto",
        width: "100%",
        // borderBottom: "0.5px solid hsl(0, 0%, 88%)",
      }}
    >
      <div
        className="p-4 flex justify-between items-center bg-[#0F0114]"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div className="flex items-center">
          <div
            className="w-[180px] cursor-pointer "
            onClick={() => (window.location = "/")}
          >
            <Image
              src={Logo}
              alt="image"
              className=""
              width={100}
              height={0}
              layout="responsive"
              placeholder="blur"
            />
          </div>
          <div className="hidden md:flex items-center px-2 text-sm">
            <div className="w-[40px] mx-4">
              <Image
                src={whiteList}
                alt="image"
                className=""
                width={100}
                height={0}
                layout="responsive"
                placeholder="blur"
              />
            </div>
            <div className="w-[40px] mx-4">
              <Image
                src={Discord}
                alt="image"
                className=""
                width={100}
                height={0}
                layout="responsive"
                placeholder="blur"
              />
            </div>
            <div className="w-[40px] mx-4">
              <Image
                src={Twitt}
                alt="image"
                className=""
                width={100}
                height={0}
                layout="responsive"
                placeholder="blur"
              />
            </div>
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
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setOpenAuth(true)}
            >
              <div className="mx-2 w-[100px]">
                <Image
                  src={signUp}
                  alt="image"
                  className=""
                  width={300}
                  height={300}
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
              <div className="mx-2">
                <Image
                  src={stick}
                  alt="image"
                  className=""
                  width={100}
                  height={0}
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
              <div className="mx-2 w-[80px]">
                <Image
                  src={logIn}
                  alt="image"
                  className=""
                  width={100}
                  height={0}
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
              <div className="mx-4 w-[50px]">
                <Image
                  src={prof}
                  alt="image"
                  className=""
                  width={100}
                  height={0}
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="text-white">{user.email.slice(0, 12)}...</p>
              <div className="mx-4 w-[50px]">
                <Image
                  src={prof}
                  alt="image"
                  className=""
                  width={100}
                  height={0}
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
