import Image from "next/image";
import React from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  GlobeEuropeAfricaIcon,
  VideoCameraIcon,
  PlusIcon,
  SparklesIcon,
  MegaphoneIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="flex sticky top-0 z-50 items-center bg-white  px-4 py-2 shadow-sm">
      {/* flex-shrink-0  to avoid collapsing on different screen sizes*/}
      <div className=" flex-shrink-0 cursor-pointer">
        <Image
          src={"/images/logo.png"}
          alt={"logo"}
          height={10}
          width={80}
          style={{ objectPosition: "center" }}
        />
      </div>
      <div className="flex items-center mx-5 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:block">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* Search Bobx */}
      <form className="flex items-center space-x-2 border flex-1 border-gray-200 rounded-sm bg-gray-100 px-3 p-1">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button hidden type="submit"></button>
      </form>
      <div className=" text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeEuropeAfricaIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <MegaphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>
      {/* SignIN -- SignOUT */}
      <div className=" items-center hidden lg:flex space-x-2 border border-gray-100 p-2   ">
        <div className=" relative  overflow-hidden h-5 w-5">
          <Image
            src="/images/robot.png"
            fill
            alt="avatar"
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-gray-400">Sign in</p>
      </div>
    </div>
  );
};

export default Header;
