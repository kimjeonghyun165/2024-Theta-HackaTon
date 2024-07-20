import React, { useState } from "react";
import { DownArrow, Earth, Lock } from "../../../../assets/icons";
import IconBtn from "../../iconBtn";
import Loading from "../../loading";
import SwapIconBtn from "../../swapIconBtn";
import { useModelStore } from "../../../../store/useModelStore";

interface ActionProps {
  onPostClick: () => Promise<void>;
}

const ActionField: React.FC<ActionProps> = ({ onPostClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onPostClick();
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublic = () => {
    setModel({
      visibility: model?.visibility === "public" ? "private" : "public",
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (model) {
      link.href = model.file;
      link.download = model.title + ".fbx";
      link.click();
    }
  };

  return (
    <div className="flex items-center justify-around gap-6">
      <SwapIconBtn
        swapOnIcon={Earth}
        swapOffIcon={Lock}
        bgColor={"bg-black/[.53]"}
        isSwapped={model?.visibility === "public"}
        onSwap={togglePublic}
      />
      <IconBtn
        icon={DownArrow}
        bgColor="bg-black/[.53]"
        onClick={handleDownload}
      />
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
