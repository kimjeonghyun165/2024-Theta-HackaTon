import React from "react";
import { Star } from "../../../assets/icons";
import Loading from "../../common/Loading";

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
      className="flex flex-col items-center w-1/2 text-white border-none btn btn-ghost rounded-2xl shadow-button bg-eleventh"
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-center gap-2">
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
