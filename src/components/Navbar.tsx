import React from "react";
import { WiDaySunny } from "react-icons/wi";
import { MdMyLocation, MdDarkMode } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex flex-row p-4 shadow-sm dark:bg-gray-800">
      <div className="basis-1/2 gap-2 flex flex-row items-center">
        <h2 className="text-3xl">Weather Information</h2>
        <span>
          <WiDaySunny className="w-16 h-16 text-yellow-400" />
        </span>
      </div>
      <div className="basis-1/2 gap-4 flex flex-row items-center justify-end">
        <button>
          <MdMyLocation className="w-8 h-8" />
        </button>
        <button>
          <MdDarkMode className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
