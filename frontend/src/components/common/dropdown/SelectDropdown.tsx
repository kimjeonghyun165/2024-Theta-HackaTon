import DownTriangle from "../../../assets/icons/DownTriangle";
import { useDropdown } from "../../../hooks/useDropdown";
import Options from "./Options";

interface SelectDropdownProps {
  subtitle: string;
  options: string[];
  placeHolder: string;
  value?: string[] | string;
  isSearch?: boolean;
  isMulti?: boolean;
  onChange?: (value: string | string[]) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  subtitle,
  options,
  placeHolder,
  value = [],
  isSearch = false,
  isMulti = false,
  onChange,
}) => {
  const {
    selectedValues,
    dropdownOpen,
    searchTerm,
    filteredOptions,
    toggleDropdown,
    handleSelectChange,
    handleSearchChange,
    handleSelectAll,
    dropdownRef,
  } = useDropdown({ options, value, isMulti, onChange });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex justify-between items-center bg-[#1C1C1C]/[.53] rounded-3xl px-6 py-3 min-w-[350px] max-w-[350px] relative"
          onClick={toggleDropdown}
        >
          <p
            className={`truncate overflow-x-hidden text-sm ${
              selectedValues.length === 0 ? "text-second/[.3]" : ""
            }`}
          >
            {selectedValues.length > 0
              ? isMulti
                ? selectedValues.join(", ")
                : selectedValues[0]
              : placeHolder}
          </p>
          {dropdownOpen && (
            <Options
              subtitle={subtitle}
              isMulti={isMulti}
              isSearch={isSearch}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              filteredOptions={filteredOptions}
              handleSelectChange={handleSelectChange}
              handleSelectAll={handleSelectAll}
              selectedValues={selectedValues}
            />
          )}
          <div
            className={`transform transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          >
            <DownTriangle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDropdown;
