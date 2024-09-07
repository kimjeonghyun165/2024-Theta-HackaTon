import React, { useEffect, useRef } from "react";
import { Check } from "../../../../assets/icons";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import IconBtn from "../../IconBtn";

interface SuccessModalProps {
  isVisible: boolean;
  message: string;
  refreshUrl: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  message,
  refreshUrl,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleCloseModal = () => {
    closeModal(ModalKey.SUCCESS_MODAL);
    if (refreshUrl) {
      window.location.replace(refreshUrl);
    }
  };

  useEffect(() => {
    const modal = modalRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    if (modal) {
      if (isVisible) {
        modal.showModal();
        modal.addEventListener("keydown", handleKeyDown);
      } else {
        modal.close();
      }
    }

    return () => {
      if (modal) {
        modal.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isVisible]);

  return (
    <dialog
      ref={modalRef}
      id="success_modal"
      className="modal backdrop-blur-sm rounded-3xl"
    >
      <div className="modal-box flex flex-col items-center text-center bg-sixteenth">
        <div className="p-2 mt-6 px-4 text-second/[.49]">
          <p>{message}</p>
        </div>
        <form className="dialog">
          <div className="modal-action" onClick={handleCloseModal}>
            <IconBtn
              icon={Check}
              className={"btn-circle p-3 bg-[#1C1C1C]/[.53]"}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SuccessModal;
