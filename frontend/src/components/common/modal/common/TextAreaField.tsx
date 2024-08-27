import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaFieldProps {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  placeholder,
  register,
  isDisabled,
}) => (
  <textarea
    className="textarea w-full resize-none rounded-3xl h-52 bg-[#1C1C1C]/[.53]"
    placeholder={
      placeholder ||
      "Description: Strong muscular human statue. #statue, #muscular, #strong"
    }
    disabled={isDisabled}
    {...register}
  ></textarea>
);

export default TextAreaField;
