import React from "react";
import { Star } from "../../../assets/icons";
import { Loading } from "../../common";

interface CreditInfoProps {
  credits: number;
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const CreditInfo: React.FC<CreditInfoProps> = ({
  credits,
  onClick,
  isLoading,
  isDisabled,
}) => {
  return (
    <button
      className="btn btn-ghost flex flex-col border-none text-white items-center w-1/2 rounded-2xl shadow-button bg-eleventh"
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-center gap-2 items-center">
            <Star opacity={isDisabled ? 0.2 : 1} />
            <span className="text-xs">{credits} Credits</span>
          </div>
          <div>Generate</div>
        </>
      )}
    </button>
  );
};

export default CreditInfo;
