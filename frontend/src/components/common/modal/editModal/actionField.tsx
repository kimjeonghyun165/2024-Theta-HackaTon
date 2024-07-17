import React, { useState } from "react";
import { DownArrow, Earth, Lock } from "../../../../assets/icons";
import IconBtn from "../../iconBtn";
import Loading from "../../loading";
import SwapIconBtn from "../../swapIconBtn";

interface ActionProps {
  onPostClick: () => Promise<void>; // onPostClick 함수가 비동기 함수라고 가정
}

const ActionField: React.FC<ActionProps> = ({ onPostClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onPostClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-around gap-6">
      <SwapIconBtn
        swapOnIcon={Lock}
        swapOffIcon={Earth}
        bgColor={"bg-black/[.53]"}
      />
      <IconBtn icon={DownArrow} bgColor="bg-black/[.53]" />
      <div className="modal-action w-full mt-0">
        <button
          className="btn w-full bg-black/[.53] rounded-full"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default ActionField;
