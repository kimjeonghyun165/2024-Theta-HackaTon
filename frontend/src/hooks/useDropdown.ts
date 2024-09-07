import { useState, useRef, useEffect } from "react";

interface UseDropdownProps {
    options: string[];
    value: string[] | string;
    isMulti: boolean;
    onChange?: (value: string | string[]) => void;
}

export const useDropdown = ({ options, value, isMulti, onChange }: UseDropdownProps) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(
        Array.isArray(value) ? value : [value]
    );
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelectChange = (option: string) => {
        let newSelectedValues;
        if (isMulti) {
            if (selectedValues.includes(option)) {
                newSelectedValues = selectedValues.filter((v) => v !== option);
            } else {
                newSelectedValues = [...selectedValues, option];
            }
        } else {
            newSelectedValues = [option];
        }
        setSelectedValues(newSelectedValues);
        if (onChange) onChange(isMulti ? newSelectedValues : newSelectedValues[0]);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDropdownOpen((prevState) => !prevState);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        if (searchValue) {
            setFilteredOptions(
                options.filter((option) =>
                    option.toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        } else {
            setFilteredOptions(options);
        }
    };

    const handleSelectAll = () => {
        if (filteredOptions.length === selectedValues.length) {
            setSelectedValues([]);
            onChange && onChange([]);
        } else {
            setSelectedValues(filteredOptions);
            onChange && onChange(filteredOptions);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return {
        selectedValues,
        dropdownOpen,
        searchTerm,
        filteredOptions,
        toggleDropdown,
        handleSelectChange,
        handleSearchChange,
        handleSelectAll,
        dropdownRef,
    };
};
