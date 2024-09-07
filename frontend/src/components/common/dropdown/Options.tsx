import { useState } from "react";
import { useSurveyStore } from "../../../store/useUserStore";
import SearchInput from "./SearchInput";

interface DropdownOptionsProps {
  subtitle: string;
  isMulti: boolean;
  isSearch: boolean;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredOptions: string[];
  handleSelectChange: (option: string) => void;
  handleSelectAll: () => void;
  selectedValues: string[];
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({
  subtitle,
  isMulti,
  isSearch,
  searchTerm,
  handleSearchChange,
  filteredOptions,
  handleSelectChange,
  handleSelectAll,
  selectedValues,
}) => {
  const setSurveyData = useSurveyStore((state) => state.setSurveyData);
  const surveyData = useSurveyStore((state) => state.surveyData);

  const handleOtherInputChange = (inputValue: string) => {
    if (subtitle === "Occupation") {
      setSurveyData({ otherOccupation: inputValue });
    } else if (subtitle === "Company Industry") {
      setSurveyData({ otherIndustry: inputValue });
    } else if (subtitle === "Usage of ANVIL AI") {
      setSurveyData({ otherUsageOfAnvilAI: inputValue });
    }
  };

  const getOtherInputValue = () => {
    if (subtitle === "Occupation") {
      return surveyData.otherOccupation || "";
    } else if (subtitle === "Company Industry") {
      return surveyData.otherIndustry || "";
    } else if (subtitle === "Usage of ANVIL AI") {
      return surveyData.otherUsageOfAnvilAI || "";
    }
    return "";
  };

  return (
    <ul className="absolute left-0 top-14 w-full bg-[#343434] rounded-[30px] z-10 py-6">
      {isSearch && (
        <SearchInput
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      )}
      <div
        className={`overflow-y-auto ${
          filteredOptions.length > 5 ? "max-h-36" : ""
        }`}
      >
        {isMulti && (
          <li
            className="px-4 py-2 cursor-pointer flex items-center"
            onClick={(e) => {
              handleSelectAll();
              e.stopPropagation();
            }}
          >
            <input
              type="checkbox"
              className="checkbox mr-2"
              checked={filteredOptions.length === selectedValues.length}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </li>
        )}
        {filteredOptions.map((option) => (
          <li
            key={option}
            className="flex items-center w-full px-4 py-2 cursor-pointer overflow-y-auto hover:bg-black/[.25]"
            onClick={(e) => {
              option !== "Other" && handleSelectChange(option);
              e.stopPropagation();
            }}
          >
            {isMulti && (
              <input
                type="checkbox"
                className="checkbox mr-2"
                checked={selectedValues.includes(option)}
                onClick={() => handleSelectChange(option)}
                readOnly
              />
            )}
            {option === "Other" ? (
              <div className="flex items-center w-full">
                <span onClick={() => handleSelectChange(option)}>{option}</span>
                <input
                  type="text"
                  onChange={(e) => handleOtherInputChange(e.target.value)}
                  placeholder="Type here"
                  value={getOtherInputValue()}
                  className="w-full rounded-full ml-2 px-3 py-1 text-sm bg-[#1C1C1C]/[.53]"
                  disabled={!selectedValues.includes("Other")}
                />
              </div>
            ) : (
              <span>{option}</span>
            )}
          </li>
        ))}
        {filteredOptions.length === 0 && (
          <li className="w-full px-4 py-2 text-center cursor-default">
            No options found
          </li>
        )}
      </div>
    </ul>
  );
};

export default DropdownOptions;
