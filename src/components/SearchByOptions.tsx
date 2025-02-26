import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store/store";
import { setSearchByOption } from "@/store/userSelectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_BY_OPTIONS } from "./utils/constants";

const SearchByOptions = () => {
  const searchBy = useSelector(
    (store: RootState) => store.userSelection.searchBy
  );
 
  const dispatch = useDispatch();
  const handleSelectChange = (value: string) => {
    dispatch(setSearchByOption(value));
  };

  return (
    <Select value={searchBy} onValueChange={handleSelectChange}>
      <SelectTrigger className="capitalize outline-none ring-0 focus:ring-offset-0 focus:ring-0 focus:outline-none">
        <SelectValue placeholder="Select a search category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SEARCH_BY_OPTIONS.map((item: string) => (
            <SelectItem
              key={item}
              value={item}
              className={`capitalize ${
                item === searchBy ? "text-purple-400/70" : "text-black-200"
              }`}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchByOptions;
