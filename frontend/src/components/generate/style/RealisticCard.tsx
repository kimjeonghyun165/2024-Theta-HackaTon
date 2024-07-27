import React from "react";
import Realistic from "../../../assets/generate/style/Realistic";
import { CheckboxWithLabel, CreditInfo } from "../common";
import CardBody from "../common/CardBody";
import "./btn.css";

interface RealisticCardProps {
  superResolution: boolean;
  setSuperResolution: (checked: boolean) => void;
  isLoading: boolean;
  isDisabled: boolean;
  handleGenerate: () => void;
}

const RealisticCard: React.FC<RealisticCardProps> = ({
  superResolution,
  setSuperResolution,
  isLoading,
  isDisabled,
  handleGenerate,
}) => {
  return (
    <div className="card relative pt-8 w-full max-w-3xl text-white pr-0">
      <div className="absolute -top-2 flex justify-between">
        <h2 className="text-3xl pl-4 font-extrabold tracking-wider">
          REALISTIC
        </h2>
        <div className="w-1/2 flex justify-center">
          <div className="w-1/2">
            <Realistic />
          </div>
        </div>
      </div>
      <CardBody className="bg-twelfth">
        <div className="w-full pb-6 flex flex-col bg-[#A1B0FF]/[.17] rounded-3xl items-start">
          <CheckboxWithLabel
            label="Super Generation"
            checkedBg="checked:bg-heart"
            checked={superResolution}
            onChange={setSuperResolution}
          />
        </div>
        <div className="px-8 py-4 flex justify-between items-center pr-0">
          <div>
            <ul className="list-disc text-sm">
              <li>High Quality</li>
              <li className="mt-1">
                Moderate Speed
                <br />
                Generation
              </li>
            </ul>
          </div>
          <CreditInfo
            credits={superResolution ? 50 : 30}
            onClick={handleGenerate}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </div>
      </CardBody>
    </div>
  );
};

export default RealisticCard;
