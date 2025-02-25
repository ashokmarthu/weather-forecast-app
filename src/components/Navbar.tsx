"use client";
import { TiWeatherPartlySunny } from "react-icons/ti";
import Temperature from "./Temperature";
import Navigation from "./Navigation";
import Theme from "./Theme";
import SearchCity from "./SearchCity";
import SearchByOptions from "./SearchByOptions";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center gap-y-2">
        <div className="grid grid-cols-1 md:grid-cols-5 justify-items-center items-center gap-y-2 w-full">
          <div className="flex justify-center items-center text-center flex-col">
            <TiWeatherPartlySunny className="w-7 h-7" />
            <small className="font-semibold"> Weather Forecast</small>
          </div>
          <div>
            <Navigation />
          </div>
          <div className="md:col-span-2">
            <Theme />
          </div>
          <div>
            <Temperature />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center items-center w-full">
          <div className="col-span-2 w-full">
            <SearchCity />
          </div>
          <div className="col-span-1 w-full">
            <SearchByOptions />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
