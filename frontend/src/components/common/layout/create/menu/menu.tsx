import { ChangeEvent } from "react";
import { First, Second, Third } from "../../../../../assets/menu";
import useStore from "../../../../../store/useStore";
import MenuItem from "./menuItem";

const Menu = () => {
  const selectedOption = useStore((state) => state.selectedOption);
  const setSelectedOption = useStore((state) => state.setSelectedOption);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <ul className="menu menu-lg bg-base-500 gap-6">
      <MenuItem
        name="option"
        value="option1"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={First}
      />
      <MenuItem
        name="option"
        value="option2"
        selectedOption={selectedOption}
        onChange={handleOptionChange}
        Icon={Second}
      />
      <MenuItem
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
