import React, { useState } from "react";
import "./range.css";
interface SliderProps {
  min: number;
  max: number;
  step: number;
}

const Range: React.FC<SliderProps> = ({ min, max, step }) => {
  const [value, setValue] = useState((min + max) / 2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative w-full h-1 rounded-lg bg-second">
        <div className="w-full absolute flex justify-evenly px-4 -translate-y-[0.375rem]">
          <div className="w-4 h-4 bg-white rounded-full " />
          <div className="w-4 h-4 bg-white rounded-full " />
          <div className="w-4 h-4 bg-white rounded-full " />
          <div className="w-4 h-4 bg-white rounded-full " />
          <div className="w-4 h-4 bg-white rounded-full " />
        </div>
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
