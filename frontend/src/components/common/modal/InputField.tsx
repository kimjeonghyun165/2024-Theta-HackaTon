import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  className?: string;
  value?: string | number;
  isdisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  className,
  value,
  isdisabled = false,
  onChange,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`input w-full bg-[#1C1C1C]/[.53] rounded-full pl-4 ${className}`}
    value={value}
    disabled={isdisabled}
    onChange={onChange}
  />
);

export default InputField;
