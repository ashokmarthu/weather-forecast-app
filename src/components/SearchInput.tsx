import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const suggestions = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "Austin",
];

const SearchInput = () => {
  return (
    <div className="flex justify-center items-center relative  p-2 gap-2">
      <div className="w-1/4 flex justify-end items-center">
        <input
          className="w-full h-12 rounded border-b-2 border-blue-100 p-2 outline-none shadow-sm bg-slate-100"
          placeholder="Search City"
          type="text"
        />
        <button className="absolute">
          <AiOutlineSearch className="w-8 h-8" />
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default SearchInput;
