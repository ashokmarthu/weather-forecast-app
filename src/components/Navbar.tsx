"use client";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Temperature from "./Temperature";
import Navigation from "./Navigation";
import DarkMode from "./DarkMode";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center items-center w-full">
        <div>
          <TiWeatherPartlySunny className="w-14 h-14" />
        </div>
        <div>
          <Navigation />
        </div>
        <div className="px-4 flex flex-col md:flex-row md:justify-around w-full space-y-2 items-center">
          <DarkMode />
          <Temperature />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
