import React, { useRef } from "react";
import { Check } from "../../../../assets/icons";
import IconBtn from "../../iconBtn";

interface SecondModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SecondModalProps> = ({ isVisible, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isVisible) return null;

  return (
    <>
      <div className="modal modal-open backdrop-blur-sm rounded-3xl">
        <div
          ref={modalRef}
          className="modal-box flex flex-col items-center text-center bg-gradient-1"
        >
          <div className="p-2 mt-6 px-4 text-second/[.49]">
            <p>Successfully posted to the Market.</p>
            <p>Would you like to check the market?</p>
          </div>
          <div className="modal-action " onClick={onClose}>
            <IconBtn icon={Check} bgColor={"bg-[#1C1C1C]/[.53]"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
