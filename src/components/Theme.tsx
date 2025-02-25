import { useTheme } from "next-themes";
import { DARK_MODE, LIGHT_MODE } from "./utils/constants";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const isChecked = theme === DARK_MODE;
  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() =>
            setTheme((prev) => (prev === LIGHT_MODE ? DARK_MODE : LIGHT_MODE))
          }
          className="sr-only"
        />
        <span className="label flex items-center text-sm font-medium">
          Light
        </span>
        <span
          className={`mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-[#212b36]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium">
          Dark
        </span>
      </label>
    </>
  );
};
export default Theme;
