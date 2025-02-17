import { RootState } from "@/store/store";
import { setSearchByOption } from "@/store/userSelectionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const SearchType = () => {
  const searchBy = useSelector(
    (store: RootState) => store.userSelection.searchBy
  );
  const dispatch = useDispatch();
  const [selectedTemp, setSelectedTemp] = useState<string>(searchBy);
  const CATEGORIES = ["city", "pin with country code"];

  const handleTemp = (value: string) => {
    setSelectedTemp(value);
    dispatch(setSearchByOption(value));
  };
  return (
    <div className="space-x-2 flex items-center">
      <small className="text-xs leading-tight text-muted-foreground">
        Please select Search Type
      </small>
      {CATEGORIES.map((type) => (
        <button
          key={type}
          onClick={() => handleTemp(type)}
          className="p-2 rounded-md border-b shadow"
        >
          <small
            className={`text-sm leading-tight capitalize ${
              selectedTemp === type ? "text-purple-400/70" : "text-black-200"
            } h-5 w-5`}
          >
            {type}
          </small>
        </button>
      ))}
    </div>
  );
};

export default SearchType;
