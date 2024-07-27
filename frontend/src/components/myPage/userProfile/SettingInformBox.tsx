import { useState } from "react";
import { Check, Question } from "../../../assets/icons";
import DownTriangle from "../../../assets/icons/DownTriangle";
import { IconBtn } from "../../common";

const icons = {
  License: Question,
  Language: DownTriangle,
  Region: DownTriangle,
  Notification: Check,
} as const;

type IconKeys = keyof typeof icons;

interface SettingItem {
  subtitle: string;
  content: string;
  type?: string;
  options?: string[];
}

interface SettingInformBoxProps {
  title: string;
  items: SettingItem[];
}

function SettingInformBox({ title, items }: SettingInformBoxProps) {
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({
    Language: "English (USA)",
    Region: "United States",
  });

  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({
    Language: false,
    Region: false,
  });

  const handleSelectChange = (subtitle: string, value: string) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [subtitle]: value,
    }));
    setDropdownOpen((prevValues) => ({
      ...prevValues,
      [subtitle]: false,
    }));
    toggleDropdown(subtitle);
  };

  const toggleDropdown = (subtitle: string) => {
    setDropdownOpen((prevValues) => ({
      ...prevValues,
      [subtitle]: !prevValues[subtitle],
    }));
  };

  return (
    <section
      aria-labelledby={`${title.replace(/ /g, "-").toLowerCase()}-heading`}
      className="mb-8"
    >
      <h3
        id={`${title.replace(/ /g, "-").toLowerCase()}-heading`}
        className="my-3 text-2xl font-extralight"
      >
        {title}
      </h3>
      <ul>
        {items.map(({ subtitle, content, type, options }, index) => (
          <li className="flex items-center gap-6 py-1 text-2xl" key={index}>
            <span className="font-bold w-72">{subtitle}</span>
            {type === "select" && options ? (
              <div className="relative inline-block">
                <div
                  className="flex items-center justify-between gap-6 text-center cursor-pointer"
                  onClick={() => toggleDropdown(subtitle)}
                >
                  <span className="bg-fifth/[.2] rounded-[30px] px-10 py-3 cursor-pointer min-w-[280px] relative">
                    {selectedValues[subtitle]}
                    {dropdownOpen[subtitle] && (
                      <ul className="absolute left-0 top-14 w-full bg-fifth border border-gray-300 rounded-[30px] mt-1 z-10 overflow-hidden">
                        {options.map((option) => (
                          <li
                            key={option}
                            className="w-full px-4 py-2 text-center cursor-pointer hover:bg-black"
                            onClick={() => handleSelectChange(subtitle, option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </span>
                  <div
                    className={`transform transition-transform ${
                      dropdownOpen[subtitle] ? "rotate-180" : ""
                    }`}
                  >
                    {
                      <IconBtn
                        icon={icons[subtitle as IconKeys]}
                        bgColor="bg-fifth/[.2] hover:bg-black"
                      />
                    }
                  </div>
                </div>
              </div>
            ) : (
              <span className="bg-fifth/[.2] rounded-[30px] px-10 flex items-center py-3 justify-center min-w-[280px]">
                {content}
              </span>
            )}
            {type !== "select" && icons[subtitle as IconKeys] && (
              <IconBtn
                icon={icons[subtitle as IconKeys]}
                bgColor="bg-fifth/[.2] hover:bg-black"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SettingInformBox;
