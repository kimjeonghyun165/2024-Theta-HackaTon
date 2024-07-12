interface InputFieldProps {
  type: string;
  placeholder: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  className,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`input w-full bg-[#1C1C1C]/[.53] rounded-full pl-4 ${className}`}
  />
);

export default InputField;
