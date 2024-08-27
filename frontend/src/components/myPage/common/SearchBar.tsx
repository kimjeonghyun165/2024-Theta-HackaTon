import React, { useState } from "react";
import { Search } from "../../../assets/icons";

interface SearchBarProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onSortChange: (isRecent: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  value,
  onSortChange,
}) => {
  const [isRecent, setIsRecent] = useState(true);

  const handleSortToggle = () => {
    const newSortOrder = !isRecent;
    setIsRecent(newSortOrder);
    onSortChange(newSortOrder);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-3/4 rounded-full bg-[#777777]/[.2] placeholder:text-white placeholder:text-2xl flex items-center px-5 gap-3 py-3">
        <Search />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full text-lg text-white bg-transparent outline-none"
          onChange={onChange}
          value={value}
        />
      </div>
      <div
        className="btn btn-ghost rounded-3xl text-lg text-white"
        onClick={handleSortToggle}
      >
        {isRecent ? "Recent ▼" : "Oldest ▲"}
      </div>
    </div>
  );
};

export default SearchBar;
