import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setSearchByOption } from "@/store/userSelectionSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface SearchOption {
  name: "zip" | "cityname";
  selected: boolean;
}

const SearchByOptions = () => {
  const searchByOptions: SearchOption[] = [
    {
      name: "zip",
      selected: false,
    },
    {
      name: "cityname",
      selected: false,
    },
  ];
  const [searchOptions, setSearchOptions] =
    useState<SearchOption[]>(searchByOptions);
  const dispatch = useDispatch();
  const handleSelectChange = (value: string) => {
    dispatch(setSearchByOption(value));
    localStorage.setItem("searchBy", value);
    setSearchOptions((prev) =>
      prev.map((option) =>
        option.name === value
          ? { ...option, selected: !option.selected }
          : option
      )
    );
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a SearchByOption" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {searchOptions.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchByOptions;
