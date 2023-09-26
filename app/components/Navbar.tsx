"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import useSellModal from "../hooks/useSellModal";
import Avatar from "./Avatar";
import { signOut } from "next-auth/react";

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const sellModal = useSellModal();

  const onSell = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    return sellModal.onOpen();
  }, [loginModal, sellModal, currentUser]);

  const [state, setState] = useState(false);
  const navRef = useRef();

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Home", path: "javascript:void(0)" },
    { title: "Contact", path: "javascript:void(0)" },
    { title: "Blog", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    const body = document.body;

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
    if (state) body.classList.add(...customBodyStyle);
    // Enable scrolling
    else body.classList.remove(...customBodyStyle);

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed", "border-b"];
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
      else navRef.current.classList.remove(...customStyle);
    };
  }, [state]);

  return (
    <nav ref={navRef} className=" bg-slate-400 w-full top-0 z-20">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
        <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
          <a href="javascript:void(0)">
            <Image
              src="/images/logo.jpg"
              width={50}
              height={50}
              alt="Carpool logo"
              className=" rounded-sm"
            />
          </a>
          <div className="lg:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
            state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
          }`}
        >
          <div>
            {currentUser ? (
              <>
                <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                  <li className=" mt-8 lg:mt-0 mb-2">
                    <div
                      onClick={onSell}
                      className="flex justify-center items-center bg-slate-500 rounded-md px-5 py-2 hover:cursor-pointer hover:text-red-400 "
                    >
                      Sell
                    </div>
                  </li>
                  <li className="mt-10 lg:mt-0">
                    <div
                      onClick={() => {
                        signOut();
                      }}
                      className=" hover:cursor-pointer py-3 px-4  font-bold font-mono  text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:flex lg:border-0 lg:py-2 lg:px-4 lg:items-center lg:justify-center "
                    >
                      Sign Out
                    </div>
                  </li>
                  <li className="mt-8 mb-8 lg:mt-0 lg:mb-0">
                    <div className="flex justify-center items-center relative h-full">
                      <Avatar src={currentUser.image} />
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                  <li className="mt-8 lg:mt-0">
                    <div
                      onClick={loginModal.onOpen}
                      className=" hover:cursor-pointer py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0"
                    >
                      Login
                    </div>
                  </li>

                  <li className="mt-8 lg:mt-0">
                    <div
                      onClick={registerModal.onOpen}
                      className=" hover:cursor-pointer py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0"
                    >
                      Sign Up
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="flex-1">
            <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-gray-600 hover:text-indigo-600 font-semibold"
                  >
                    <a href={item.path}>
                      <div className=" flex justify-center items-center bg-slate-300 rounded-md px-5 py-2 hover:scale-110">
                        {item.title}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
