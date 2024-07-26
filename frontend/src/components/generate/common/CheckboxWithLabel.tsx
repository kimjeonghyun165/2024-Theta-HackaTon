import React from "react";

interface CheckboxWithLabelProps {
  label: string;
  checkedBg: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  checkedBg,
  checked,
  onChange,
}) => {
  return (
    <div className="w-1/2 z-10 px-4 mt-3 flex flex-col items-center gap-2">
      <span className="text-xs font-semibold">+ 20 Credits</span>
      <input
        type="checkbox"
        aria-label={label}
        className={`btn btn-ghost w-full border-none text-white rounded-3xl shadow-button bg-eleventh ${checkedBg}`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

export default CheckboxWithLabel;
