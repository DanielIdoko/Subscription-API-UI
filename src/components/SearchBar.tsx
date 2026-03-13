import React from "react";
import { FiSearch } from "react-icons/fi";
import { useMainStore } from "../store/mainStore";

const SearchBar = () => {
  const searchBoxVisible = useMainStore((s: any) => s.searchBoxVisible)

  return (
      <form className={`bg-base rounded-full ${searchBoxVisible && 'hidden'} md:flex p-2 w-80 items-center gap-2`}>
      <input type="search" placeholder="Search here" className="w-full h-full outline-0 font-inter text-small text-text-muted"/>
    </form>
  );
};

export default SearchBar;
