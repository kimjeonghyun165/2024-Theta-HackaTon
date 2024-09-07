import React, { useState } from "react";
import "./range.css";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  paddingX?: string;
}

const Range: React.FC<SliderProps> = ({
  min,
  max,
  step,
  initialValue,
  onChange,
  showValue = false,
  paddingX,
}) => {
  const [value, setValue] = useState(initialValue || min);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  const numDots = Math.floor((max - min) / step) + 1;
  const dots = Array.from({ length: numDots }, (_, index) => (
    <div key={index} className={`bg-white rounded-full h-4 w-4`} />
  ));

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-1 height-small:h-[3px] bg-white rounded-lg">
        <div
          className={`w-full absolute flex justify-between -translate-y-[0.375rem] ${paddingX}`}
        >
          {dots}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute w-full h-1  bg-transparent appearance-none"
        />
      </div>
      {showValue && <div className="mt-2 text-center text-white">{value}</div>}
    </div>
  );
};

const SimpleRange: React.FC<SliderProps> = ({ min, max, step }) => {
  const [value, setValue] = useState((min + max) / 2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative w-full h-1 rounded-lg bg-second">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute w-full h-1 bg-transparent appearance-none"
        />
      </div>
    </div>
  );
};

export { Range, SimpleRange };
