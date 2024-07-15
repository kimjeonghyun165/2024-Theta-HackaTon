import React from "react";

interface DropDownItem {
  label: string;
  onClick?: () => void;
  href?: string;
}
//d
interface DropDownProps {
  buttonContent: React.ReactNode;
  items: DropDownItem[];
  position?: "top" | "bottom" | "left" | "right";
}

const DropDown: React.FC<DropDownProps> = ({
  buttonContent,
  items,
  position = "bottom",
}) => {
  const handleItemClick = (item: DropDownItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className={`dropdown dropdown-${position} dropdown-end`}>
      <div tabIndex={0} role="button" className="btn m-1">
        {buttonContent}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {items.map((item, index) => (
          <li key={index}>
            <a onClick={() => handleItemClick(item)}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
