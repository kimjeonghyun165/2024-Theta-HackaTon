import React, { useRef, useState, useEffect } from "react";
import {
  Check,
  DownArrow,
  Market,
  Question,
} from "../../../assets/icons";
import { Model } from "../../../store/useModelStore";
import IconBtn from "../../common/IconBtn";
import InputField from "../../common/modal/InputField";
import ThreeScene from "../../common/threeScene/ThreeScene";

interface ModelBoxProps {
  model: Model;
  children: React.ReactNode;
  role: string;
}

const ModelBox: React.FC<ModelBoxProps> = ({ model, children, role }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (modalRef.current === null) return;
    setIsModalOpen(true);
    modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current === null) return;
    setIsModalOpen(false);
    modalRef.current.close();
  };

  useEffect(() => {
    if (!isModalOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        className="w-[400px] h-[400px] sm:w-[293px] sm:h-[293px] xl:w-[450px] xl:h-[450px] bg-[#777777]/[0.2] rounded-[30px] flex flex-col justify-between items-center overflow-hidden mx-auto"
        onClick={openModal}
        role={role}
      >
        {children}
      </button>
      <dialog
        ref={modalRef}
        style={{
          background:
            "linear-gradient(180deg, rgba(208, 208, 208, 0.25) 0%, rgba(106, 106, 106, 0.5) 100%)",
        }}
        className="backdrop:backdrop-blur-md rounded-3xl"
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
      >
        {isModalOpen && (
          <div className="flex w-[1000px] p-10 items-center bg-sixteenth bg-opacity-50">
            <div className="w-1/2 h-full">
              <ThreeScene
                backgroundColor={0xffffff}
                backgroundOpacity={0}
                showGrid={false}
                modelPath={model?.file}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-6 px-6">
              <InputField type="text" placeholder="Title :" />
              <textarea
                className="textarea w-full resize-none rounded-3xl h-48 bg-[#1C1C1C]/[.53]"
                placeholder={model.description}
              ></textarea>
              <label className="input flex items-center justify-around border-none bg-[#1C1C1C]/[.53] rounded-full pr-0">
                <input
                  type="text"
                  placeholder="Make as NFT?"
                  className="rounded-full grow focus:outline-none"
                />
                <IconBtn icon={Check} bgColor="bg-[#1C1C1C]/[.53]" />
              </label>
              <div className="flex justify-around gap-3">
                <InputField type="text" placeholder={"Price: 0.792 ETH"} />
                <IconBtn icon={Market} bgColor="bg-[#1C1C1C]/[.53]" />
                <IconBtn icon={Question} bgColor="bg-[#1C1C1C]/[.53]" />
              </div>
              <div className="flex items-center justify-around gap-6">
                <IconBtn icon={DownArrow} bgColor="bg-black/[.53]" />
                <div className="w-full mt-0 modal-action">
                  <button
                    className="btn w-1/2 bg-black/[.53] rounded-full"
                    onClick={closeModal}
                  >
                    Customize 3D Model
                  </button>
                  <button
                    className="btn w-1/2 bg-black/[.53] rounded-full"
                    onClick={closeModal}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export default ModelBox;