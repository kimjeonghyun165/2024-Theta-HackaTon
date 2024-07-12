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
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-1 bg-second rounded-lg">
        <div className="w-full absolute flex justify-evenly px-4 -translate-y-[0.375rem]">
          <div className=" bg-white rounded-full h-4 w-4" />
          <div className=" bg-white rounded-full h-4 w-4" />
          <div className=" bg-white rounded-full h-4 w-4" />
          <div className=" bg-white rounded-full h-4 w-4" />
          <div className=" bg-white rounded-full h-4 w-4" />
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
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-1 bg-second rounded-lg">
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
