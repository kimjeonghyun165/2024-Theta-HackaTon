import { ChangeEvent } from "react";
import {
  First,
  Second,
  Third,
  Fourth,
} from "../../../../../assets/generate/menu";
import { useOptionStore } from "../../../../../store/useStore";
import MenuItem from "./MenuItem";

const Menu = () => {
  const selectedOption = useOptionStore((state) => state.selectedOption);
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <ul className="gap-6 menu menu-lg bg-base-500">
      <MenuItem
        id="prompt"
        name="option"
        value="option1"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={First}
      />
      <MenuItem
        id="imgSelection"
        name="option"
        value="option2"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={Second}
      />
      <MenuItem
        id="style"
        name="option"
        value="option3"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={Third}
      />
      <MenuItem
        id="customization"
        name="option"
        value="option4"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={Fourth}
      />
    </ul>
  );
};

export default Menu;
