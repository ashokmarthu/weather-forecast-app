"use client";
import { MdMyLocation, MdDarkMode } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useTheme } from "next-themes";
const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg:baground?60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <TiWeatherPartlySunny className="w-14 h-14" />
        <div className="basis-1/2 gap-4 flex flex-row items-center justify-end">
          <button onClick={() => setTheme("dark")}>
            <MdMyLocation className="w-8 h-8" />
          </button>
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
