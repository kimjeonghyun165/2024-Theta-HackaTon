import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  label?: string;
  className?: string;
  value?: string | number;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
  error?: string;
}

const InputField = ({
  type,
  placeholder,
  label,
  className,
  value,
  isDisabled = false,
  register,
  error,
}: InputFieldProps) => {
  const { onChange, onBlur, name, ref } = register || {};

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text text-white ml-3 text-xl">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input w-full bg-[#1C1C1C]/[.53] rounded-full pl-4 ${className} ${
          error ? "border-red-500" : ""
        }`}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
