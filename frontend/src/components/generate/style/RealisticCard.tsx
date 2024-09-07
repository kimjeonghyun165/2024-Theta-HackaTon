import React from "react";
import Realistic from "../../../assets/generate/style/Realistic";
import CardBody from "../common/CardBody";
import "./btn.css";
import CheckboxWithLabel from "../common/CheckboxWithLabel";
import CreditInfo from "../common/CreditInfo";

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
    <div className="relative w-full max-w-3xl pt-8 pr-0 text-white card">
      <div className="absolute flex justify-between -top-2">
        <h2 className="pl-4 text-2xl height-small:text-xl font-extrabold tracking-wider">
          REALISTIC
        </h2>
        <div className="flex justify-center w-1/2">
          <div className="w-1/2">
            <Realistic />
          </div>
        </div>
      </div>
      <CardBody className="bg-twelfth">
        <div className="w-full pb-3 flex flex-col bg-[#A1B0FF]/[.17] rounded-3xl items-start">
          <CheckboxWithLabel
            label="Super Generation"
            checkedBg="checked:bg-heart"
            checked={superResolution}
            onChange={setSuperResolution}
          />
        </div>
        <div className="flex items-center justify-between px-8 py-4 pr-0 height-small:py-2">
          <div>
            <ul className="text-xs list-disc">
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
