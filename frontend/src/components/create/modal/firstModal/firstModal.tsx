import React, { useEffect, useRef } from "react";
import {
  Check,
  DownArrow,
  Earth,
  Lock,
  Market,
  Question,
} from "../../../../assets/icons";
import IconBtn from "../../../common/iconBtn";
import SwapIconBtn from "../../../common/swapIconBtn";
import ThreeScene from "../../../common/threeScene/main";
import InputField from "./inputField";

interface PostPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onOpenNextModal: () => void;
}

const FirstModal: React.FC<PostPopupProps> = ({
  isVisible,
  onClose,
  onOpenNextModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handlePostClick = () => {
    onClose();
    onOpenNextModal();
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
            />
          </div>
          <div className="w-1/2 flex flex-col gap-6 px-6">
            <InputField type="text" placeholder="Title :" />
            <textarea
              className="textarea w-full resize-none rounded-3xl h-48 bg-[#1C1C1C]/[.53]"
              placeholder="Description: Strong muscular human statue. #statue, #muscular, #strong"
            ></textarea>
            <label className="input flex items-center justify-around border-none bg-[#1C1C1C]/[.53] rounded-full pr-0">
              <input
                type="text"
                placeholder="Make as NFT?"
                className="grow focus:outline-none rounded-full"
              />
              <IconBtn icon={Check} bgColor="bg-[#1C1C1C]/[.53]" />
            </label>
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

export default FirstModal;
