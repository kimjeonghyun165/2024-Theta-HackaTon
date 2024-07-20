import { ChangeEvent } from "react";
import { First, Second, Third } from "../../../../../assets/menu";
import { useOptionStore } from "../../../../../store/useStore";
import MenuItem from "./menuItem";

const Menu = () => {
  const selectedOption = useOptionStore((state) => state.selectedOption);
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  console.log(selectedOption);

  return (
    <ul className="menu menu-lg bg-base-500 gap-6">
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
        id="customization"
        name="option"
        value="option3"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={Third}
      />
    </ul>
  );
};

export default Menu;
