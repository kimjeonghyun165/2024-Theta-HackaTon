import React from "react";

interface TextAreaFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ value, onChange }) => (
  <textarea
    className="textarea w-full resize-none rounded-3xl h-48 bg-[#1C1C1C]/[.53]"
    placeholder="Description: Strong muscular human statue. #statue, #muscular, #strong"
    value={value}
    onChange={onChange}
  ></textarea>
);

export default TextAreaField;
