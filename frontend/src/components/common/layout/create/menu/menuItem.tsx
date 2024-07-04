import { ChangeEvent } from "react";

interface MenuItemProps {
  name: string;
  value: string;
  selectedOption: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon: React.FC<{ selected: boolean }>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  value,
  selectedOption,
  onChange,
  Icon,
}) => {
  const isSelected = selectedOption === value;
  console.log(selectedOption);
  return (
    <li
      className={`w-16 m-2 menu-item ${
        selectedOption === value ? "active" : ""
      }`}
    >
      <label className={`p-3 ${isSelected ? "bg-sixth/[.12]" : "bg-none"}`}>
        <input
          name={name}
          value={value}
          type="radio"
          onChange={onChange}
          className="hidden"
        />
        <Icon selected={isSelected} />
      </label>
    </li>
  );
};

export default MenuItem;
