import { MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { DARK_MODE, LIGHT_MODE } from "./utils/constants";

const DarkMode = () => {
  const { setTheme } = useTheme();
  return (
    <button>
      <MdDarkMode
        className="w-8 h-8"
        onClick={() =>
          setTheme((prev) => (prev === DARK_MODE ? LIGHT_MODE : DARK_MODE))
        }
      />
    </button>
  );
};

export default DarkMode;
