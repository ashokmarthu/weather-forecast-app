"use client";
import { MdMyLocation, MdDarkMode } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-5 w-full border-b bg-background/95 backdrop-blur py-2">
      <div className="grid grid-cols-1 md:grid-cols-4 justify-items-center items-center w-full">
        <div className="">
          <TiWeatherPartlySunny className="w-14 h-14" />
        </div>
        <div>
          <button>
            <MdMyLocation className="w-8 h-8" />
          </button>
        </div>
        <div className="relative flex justify-end items-center w-full">
          <input
            placeholder="Search city"
            className="h-10 outline-none border px-2 shadow bg-gray-400/20 rounded w-full pr-8"
            maxLength={50}
          />
          <button className="h-full absolute items-center bg-gray-400/20 rounded w-7">
            <IoSearchOutline className="w-8 h-8 px-2" />
          </button>
        </div>
        <div className="px-4 flex justify-end">
          <button>
            <MdDarkMode
              className="w-8 h-8"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
