import React, { useEffect, useRef } from "react";
import { Check } from "../../../../assets/icons";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import IconBtn from "../../IconBtn";

interface SuccessModalProps {
  isVisible: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const handleCloseModal = () => {
    closeModal(ModalKey.SUCCESS_MODAL);
    window.location.replace("/model/generate");
  };

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
      <div className="modal-box flex flex-col items-center text-center bg-sixteenth">
        <div className="p-2 mt-6 px-4 text-second/[.49]">
          <p>The model was successfully created.</p>
        </div>
        <form className="dialog">
          <div className="modal-action" onClick={handleCloseModal}>
            <IconBtn icon={Check} bgColor={"bg-[#1C1C1C]/[.53]"} />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SuccessModal;
