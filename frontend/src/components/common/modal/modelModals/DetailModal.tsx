import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, DownArrow, Market, Question } from "../../../../assets/icons";
import { Model } from "../../../../interfaces/model.interface";
import { useModelStore } from "../../../../store/useModelStore";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import IconBtn from "../../IconBtn";
import ThreeScene from "../../threeScene/ThreeScene";
import ModalLayout from "../common/Layout";
import EditModal from "./EditModal";

interface ModelBoxProps {
  model: Model;
  children?: React.ReactNode;
}

const DetailModal: React.FC<ModelBoxProps> = ({ model }) => {
  const navigate = useNavigate();
  const { modals, openModal, closeModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
    closeModal: state.closeModal,
  }));

  const setEditModel = useModelStore((state) => state.setEditModel);

  const handleDownload = () => {
    const link = document.createElement("a");
    if (model) {
      link.href = model.file;
      link.download = model.title + ".fbx";
      link.click();
    }
  };

  const handleCustomButton = () => {
    setEditModel(model);
    navigate("/model/generate/customization");
  };

  const handleEditButton = () => {
    closeModal(ModalKey.DETAIL_MODAL);
    openModal(ModalKey.EDIT_MODAL);
  };

  return (
    <>
      {model && (
        <ModalLayout
          isVisible={modals.detailModal}
          modalName={ModalKey.DETAIL_MODAL}
          className={"min-w-[950px]"}
          className2={"h-3/5"}
        >
          <div className="w-1/2 h-full">
            <ThreeScene
              backgroundColor={0xffffff}
              backgroundOpacity={0}
              showGrid={true}
              modelPath={model.file}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-6 px-6 text-left text-sm break-all text-white">
            <div className="bg-[#1C1C1C]/[.53] p-3 pl-4 rounded-full">
              {model.title}
            </div>
            <div className="h-48 bg-[#1C1C1C]/[.53] p-3 pl-4 rounded-3xl">
              <p>{model.description}</p>
            </div>
            <div className="w-full flex justify-between items-center bg-[#1C1C1C]/[.53] pl-4 rounded-full">
              <p className="text-sm">Upload to Market?</p>
              <label
                className={`btn btn-circle border-none p-4 ${
                  model.listing ? "bg-[#191d24]" : "bg-[#1C1C1C]/[.53]"
                }`}
              >
                <Check />
              </label>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="bg-[#1C1C1C]/[.53] p-3 pl-4 w-full rounded-full">
                price :
                {model.price === null ? " No Listing" : model.price + " $"}
              </div>
              <IconBtn
                icon={Market}
                className="btn-circle p-4 bg-[#1C1C1C]/[.53]"
                tooltip="Market"
              />
              <IconBtn
                icon={Question}
                className="btn-circle p-4 bg-[#1C1C1C]/[.53]"
                tooltip="FAQ"
              />
            </div>
            <div className="flex items-center justify-around gap-6">
              <IconBtn
                icon={DownArrow}
                className="btn-circle p-4 bg-[#1C1C1C]/[.53]"
                onClick={handleDownload}
                tooltip="Download as fbx"
                tooltipPosition="bottom"
              />
              <div className="w-full mt-0 modal-action">
                <button
                  className="btn w-1/2 bg-black/[.53] rounded-full text-white"
                  onClick={handleCustomButton}
                >
                  Customize
                </button>
                <button
                  className="btn w-1/2 bg-black/[.53] rounded-full text-white"
                  onClick={handleEditButton}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
      {modals.editModal && <EditModal mode={"edit"} initialModel={model} />}
    </>
  );
};

export default DetailModal;
