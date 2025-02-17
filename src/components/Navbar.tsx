"use client";
import { MdDarkMode} from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useTheme } from "next-themes";
import Temperature from "./Temperature";
import MyLocation from "./Navigation";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center items-center w-full">
        <div>
          <TiWeatherPartlySunny className="w-14 h-14" />
        </div>
        <MyLocation />
        <div className="px-4 flex flex-col md:flex-row md:justify-around w-full space-y-2 items-center">
          <button>
            <MdDarkMode
              className="w-8 h-8"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            />
          </button>
          <Temperature />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
