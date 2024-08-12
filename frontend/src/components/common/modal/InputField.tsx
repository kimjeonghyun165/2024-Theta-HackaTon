import { UseFormRegisterReturn } from "react-hook-form";
import ExclamationPoint from "../../../assets/login/ExclamationPoint";

interface InputFieldProps {
  type: string;
  placeholder: string;
  label?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  value?: string;
  isDisabled?: boolean;
  button?: string;
  buttonFn?: () => void | string;
}

const InputField = ({ type,
  placeholder,
  label,
  className,
  register,
  errorMessage,
  value, isDisabled, button, buttonFn }: InputFieldProps) => {
  const { onChange, onBlur, name, ref } = register || {};
  return (
    <div className="w-full form-control">
      {label && (
        <label className="label">
          <span className="ml-3 text-xl text-white label-text">{label}</span>
        </label>
      )}
      <div className="flex gap-5">
        <input
          type={type}
          placeholder={placeholder}
          className={`input w-full bg-[#1C1C1C]/[.53] rounded-full px-4 ${className} ${errorMessage ? "border-red-500" : ""
            }`}
          value={value}
          disabled={isDisabled}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
        {button &&
          <button
            className="h-full text-base text-white bg-gray-600 border-transparent rounded-xl hover:bg-gray-900 btn"
            onClick={buttonFn}
          >
            {button}
          </button>
        }
      </div>
      {errorMessage &&
        <span className="flex gap-2 mt-2 ml-4 text-sm text-highlight">
          <div className="flex flex-col">
            {errorMessage.split("...").map((message) =>
              <span className="flex items-center gap-2">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-highlight"><ExclamationPoint /></div>
                {message}
              </span>)}
          </div>
        </span>}
    </div>
  );
};

export default InputField;
