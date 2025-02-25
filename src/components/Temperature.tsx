import { RootState } from "@/store/store";
import { setUnitConversion } from "@/store/userSelectionSlice";
import { TbTemperatureFahrenheit, TbTemperatureCelsius } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { IMPERIAL, METRIC, TEMP_CATEGORIES } from "./utils/constants";

const Temperature = () => {
  const unitType = useSelector((store: RootState) => store.userSelection.units);
  const dispatch = useDispatch();

  const handleTemp = () => {
    dispatch(setUnitConversion(unitType === METRIC ? IMPERIAL : METRIC));
  };

  return (
    <div
      className="shadow rounded relative inline-flex cursor-pointer select-none items-center"
      role="button"
      onClick={handleTemp}
    >
      <div className="shadow-card flex h-[40px] w-[70px] items-center justify-center rounded-md bg-white dark:bg-[#212b36]">
        {TEMP_CATEGORIES.map((temp) => (
          <span
            className={`flex h-8 w-8 items-center justify-center rounded ${
              unitType === temp ? "bg-blue-300" : ""
            }`}
            key={temp}
          >
            {temp === METRIC ? (
              <TbTemperatureCelsius />
            ) : (
              <TbTemperatureFahrenheit />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Temperature;
