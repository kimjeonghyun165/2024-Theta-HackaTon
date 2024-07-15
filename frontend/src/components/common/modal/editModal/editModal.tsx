import React, { useEffect, useRef } from "react";
import {
  Check,
  DownArrow,
  Earth,
  Lock,
  Market,
  Question,
} from "../../../../assets/icons";
import { useModelStore } from "../../../../store/useModelStore";
import IconBtn from "../../iconBtn";
import SwapIconBtn from "../../swapIconBtn";
import ThreeScene from "../../threeScene/main";
import InputField from "../inputField";

interface PostPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onOpenNextModal: () => void;
}

const EditModal: React.FC<PostPopupProps> = ({
  isVisible,
  onClose,
  onOpenNextModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { model, setModel, addModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
    addModel: state.addModel,
  }));

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handlePostClick = async () => {
    if (model) {
      await addModel(model);
    }
    onClose();
    onOpenNextModal();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel({ title: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setModel({ description: e.target.value });
  };

  return (
    <>
      <div className="modal modal-open backdrop-blur-sm flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className="modal-box flex min-w-[1000px] h-3/5 p-10 items-center bg-gradient-1 bg-opacity-50 rounded-3xl"
        >
          <div className="h-full w-1/2">
            <ThreeScene
              backgroundColor={0xffffff}
              backgroundOpacity={0}
              showGrid={false}
              modelPath="https://gateway.pinata.cloud/ipfs/Qmbj6DwoZkKi9RkphF18ZyjGXYFs3AR2RKKNGN9gZe1LRg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-6 px-6">
            <InputField
              type="text"
              placeholder="Title :"
              value={model?.title || ""}
              onChange={handleTitleChange}
            />
            <textarea
              className="textarea w-full resize-none rounded-3xl h-48 bg-[#1C1C1C]/[.53]"
              placeholder="Description: Strong muscular human statue. #statue, #muscular, #strong"
              value={model?.description || ""}
              onChange={handleDescriptionChange}
            ></textarea>
            <div className="w-full flex justify-between items-center bg-[#1C1C1C]/[.53] pl-4 rounded-full">
              <p className="">Make as NFT?</p>
              <IconBtn icon={Check} bgColor="bg-[#1C1C1C]/[.53]" />
            </div>
            <div className="flex justify-around gap-3">
              <InputField type="text" placeholder="Price: 0.792 ETH" />
              <IconBtn icon={Market} bgColor="bg-[#1C1C1C]/[.53]" />
              <IconBtn icon={Question} bgColor="bg-[#1C1C1C]/[.53]" />
            </div>
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
                  onClick={handlePostClick}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label className="modal-backdrop"></label>
    </>
  );
};

export default EditModal;
