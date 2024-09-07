import React, { useEffect, useRef, useCallback } from "react";
import { ModalKey, useModalStore } from "../../../../store/useStore";

interface ModalProps {
  isVisible: boolean;
  modalName: ModalKey;
  closeBtn?: boolean;
  children: React.ReactNode;
  children2?: React.ReactNode;
  className?: string;
  className2?: string;
}

const ModalLayout: React.FC<ModalProps> = ({
  isVisible,
  modalName,
  closeBtn = true,
  children,
  children2,
  className,
  className2,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleClose = useCallback(() => {
    closeModal(modalName);
    if (modalRef.current) {
      modalRef.current.close();
    }
  }, [closeModal, modalName]);

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
  }, [isVisible, handleClose]);

  return (
    <dialog ref={modalRef} className={`modal backdrop-blur-sm`}>
      <div className={`${className2}`}>
        {children2}
        <div
          className={`modal-box flex p-10 h-full bg-sixteenth bg-opacity-80 rounded-3xl ${className}`}
        >
          {closeBtn && (
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
          )}
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default ModalLayout;
