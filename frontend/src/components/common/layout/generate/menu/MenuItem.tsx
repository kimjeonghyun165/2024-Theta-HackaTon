import { ChangeEvent, useEffect, useState } from "react";
import { useModelStore } from "../../../../../store/useModelStore";

interface MenuItemProps {
  id: string;
  name: string;
  value: string;
  selectedOption: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon: React.FC<{ selected: boolean }>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  value,
  selectedOption,
  onChange,
  Icon,
}) => {
  const newModel = useModelStore((state) => state.newModel);
  const isSelected = selectedOption === value;
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    let disabled = false;
    if (
      value === "option2" &&
      (!newModel?.imgSelection || newModel.imgSelection.length === 0)
    ) {
      disabled = true;
    }

    if (value === "option3" && !newModel?.selectedImage) {
      disabled = true;
    }

    if (value === "option4" && !newModel?.file) {
      disabled = true;
    }
    setIsDisabled(disabled);
  }, [newModel, value]);

  return (
    <li className={`w-16 m-2 menu-item ${isSelected ? "active" : ""}`}>
      <label
        className={`p-3 ${isSelected ? "bg-sixth/[.12]" : "bg-none"} ${
          isDisabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          onChange={onChange}
          className="hidden"
          disabled={isDisabled}
          checked={isSelected}
        />
        <Icon selected={isSelected} />
      </label>
    </li>
  );
};

export default MenuItem;
