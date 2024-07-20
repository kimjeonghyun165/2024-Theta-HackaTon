import React, { useEffect, useRef } from "react";
import { Check } from "../../../../assets/icons";
import IconBtn from "../../iconBtn";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      if (isVisible) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isVisible]);

  return (
    <dialog
      ref={modalRef}
      id="success_modal"
      className="modal backdrop-blur-sm rounded-3xl"
    >
      <div className="modal-box flex flex-col items-center text-center bg-gradient-1">
        <div className="p-2 mt-6 px-4 text-second/[.49]">
          <p>The model was successfully created.</p>
          {/* <p>Would you like to check the market?</p> */}
        </div>
        <form className="dialog">
          <div className="modal-action" onClick={onClose}>
            <IconBtn icon={Check} bgColor={"bg-[#1C1C1C]/[.53]"} />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SuccessModal;
