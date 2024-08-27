import React from "react";
import { DownArrow, Earth, Lock } from "../../../../assets/icons";
import IconBtn from "../../IconBtn";
import Loading from "../../Loading";
import SwapIconBtn from "../../SwapIconBtn";
import { useModelStore } from "../../../../store/useModelStore";

interface ActionProps {
  isLoading: boolean;
}

const ActionField: React.FC<ActionProps> = ({ isLoading }) => {
  const { newModel, setNewModel } = useModelStore((state) => ({
    newModel: state.newModel,
    setNewModel: state.setNewModel,
  }));

  const togglePublic = () => {
    setNewModel({
      visibility: newModel?.visibility === "public" ? "private" : "public",
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (newModel) {
      link.href = newModel.file;
      link.download = newModel.title + ".fbx";
      link.click();
    }
  };

  return (
    <div className="flex items-center justify-around gap-6">
      <SwapIconBtn
        swapOnIcon={Earth}
        swapOffIcon={Lock}
        bgColor={"bg-black/[.53]"}
        isSwapped={newModel?.visibility === "public"}
        onSwap={togglePublic}
      />
      <IconBtn
        icon={DownArrow}
        bgColor="bg-black/[.53]"
        onClick={handleDownload}
      />
      <div className="w-full mt-0 modal-action">
        <button
          className="btn w-full bg-black/[.53] rounded-full text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default ActionField;
