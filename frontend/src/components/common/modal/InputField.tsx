import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  className?: string;
  value?: string | number;
  isdisabled?: boolean;
  register: UseFormRegisterReturn;
}

const InputField = ({
  type,
  placeholder,
  className,
  value,
  isdisabled = false,
  register
}: InputFieldProps) => {
  const { onChange, onBlur, name, ref } = register || {};
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input w-full bg-[#1C1C1C]/[.53] rounded-full pl-4 ${className}`}
      // value={value}
      disabled={isdisabled}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      
    />)
};

export default InputField;
