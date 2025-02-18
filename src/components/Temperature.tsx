import { RootState } from "@/store/store";
import { setUnitConversion } from "@/store/userSelectionSlice";
import { TbTemperatureFahrenheit, TbTemperatureCelsius } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { TEMP_CATEGORIES } from "./utils/constants";

const Temperature = () => {
  const unitType = useSelector((store: RootState) => store.userSelection.units);
  const dispatch = useDispatch();

  const handleTemp = (value: string) => {
    dispatch(setUnitConversion(value));
  };

  return (
    <div className="gap-2 flex">
      {TEMP_CATEGORIES.map((type) => (
        <button
          key={type}
          onClick={() => handleTemp(type)}
          className="p-2 rounded-md border-b shadow-inner"
        >
          {type === "metric" ? (
            <TbTemperatureCelsius
              className={`${
                unitType === type ? "text-green-400" : "text-black-200"
              } h-5 w-5`}
            />
          ) : (
            <TbTemperatureFahrenheit
              className={`${
                unitType === type ? "text-green-400" : "text-black-200"
              } h-5 w-5`}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Temperature;
