import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { DARK_MODE, LIGHT_MODE } from "./utils/constants";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="z-2 rounded-full p-2 bg-blue-400 ring-2 ring-offset-white"
      onClick={() =>
        setTheme((prev) => (prev === DARK_MODE ? LIGHT_MODE : DARK_MODE))
      }
    >
      {theme === "light" ? (
        <MdOutlineLightMode className="w-6 h-6" />
      ) : (
        <MdDarkMode className="w-6 h-6" />
      )}
    </button>
  );
};

export default DarkMode;
