import { useTheme } from "next-themes";
import { DARK_MODE, LIGHT_MODE } from "./utils/constants";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const isChecked = theme === DARK_MODE;

  const handleToggle = () => {
    setTheme((prev) => (prev === LIGHT_MODE ? DARK_MODE : LIGHT_MODE));
  };

  return (
    <div className="relative inline-flex cursor-pointer select-none items-center">
      <span className="label flex items-center text-sm font-medium">Light</span>
      <button
        className={`mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
          isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
        }`}
        role="switch"
        onClick={handleToggle}
      >
        <span
          className={`h-6 w-6 rounded-full bg-white duration-200 ${
            isChecked ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </button>
      <span className="label flex items-center text-sm font-medium">Dark</span>
    </div>
  );
};

export default Theme;
