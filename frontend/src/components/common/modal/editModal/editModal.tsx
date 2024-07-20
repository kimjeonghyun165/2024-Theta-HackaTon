import React, { useEffect, useRef } from "react";
import { Check, Market, Question } from "../../../../assets/icons";
import { useModelStore } from "../../../../store/useModelStore";
import IconBtn from "../../iconBtn";
import ThreeScene from "../../threeScene/threeScene";
import ActionField from "./actionField";
import InputField from "../inputField";
import TextAreaField from "../textAreaField";
import { mintNFT } from "../../../../utils/web3/nft";
import { useFileStore } from "../../../../store/useStore";

interface PostPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onPostAndOpenNext: () => void;
}

const EditModal: React.FC<PostPopupProps> = ({
  isVisible,
  onClose,
  onPostAndOpenNext,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const fileUrl = useFileStore((state) => state.fileUrl);
  const { model, setModel, addModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
    addModel: state.addModel,
  }));

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

  const handlePostClick = async () => {
    if (model) {
      if (model?.nftDetails.isNft === true) {
        await mintNFT({
          prompt: model.prompt,
          title: model.title,
          description: model.description,
          preview: model.preview,
        });
      }
      await addModel(model);
    }
    onPostAndOpenNext();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel({ title: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setModel({ description: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (model?.nftDetails.isNft === true) {
      setModel({
        nftDetails: { ...model?.nftDetails, price: Number(e.target.value) },
      });
    }
  };

  const handleCheckboxChange = () => {
    setModel({
      nftDetails: {
        ...model?.nftDetails,
        isNft: !model?.nftDetails?.isNft,
      },
    });
  };

  return (
    <dialog
      ref={modalRef}
      id="edit_modal"
      className="modal backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="modal-box flex items-center min-w-[1000px] h-3/5 p-10 bg-gradient-1 bg-opacity-50 rounded-3xl">
        <form method="dialog" className="absolute right-2 top-2">
          <div className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </div>
        </form>
        <div className="h-full w-1/2">
          {fileUrl && (
            <ThreeScene
              backgroundColor={0xffffff}
              backgroundOpacity={0}
              showGrid={false}
              modelPath={fileUrl}
            />
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-6 px-6">
          <InputField
            type="text"
            placeholder="Title : "
            value={model?.title || ""}
            onChange={handleTitleChange}
          />
          <TextAreaField
            value={model?.description || ""}
            onChange={handleDescriptionChange}
          />
          <div className="w-full flex justify-between items-center bg-[#1C1C1C]/[.53] pl-4 rounded-full">
            <p className="">Make as NFT?</p>
            <label
              className={`btn btn-circle border-none p-4 ${
                model?.nftDetails.isNft ? "bg-[#191d24]" : "bg-[#1C1C1C]/[.53]"
              }`}
            >
              <input
                className="hidden"
                type="checkbox"
                onChange={handleCheckboxChange}
              />
              <Check />
            </label>
          </div>
          <div className="flex justify-around gap-3">
            <InputField
              type="text"
              placeholder="Price: 0.792 ETH"
              value={model?.nftDetails.price || 0}
              isdisabled={!model?.nftDetails.isNft}
              onChange={handlePriceChange}
            />
            <IconBtn icon={Market} bgColor="bg-[#1C1C1C]/[.53]" />
            <IconBtn icon={Question} bgColor="bg-[#1C1C1C]/[.53]" />
          </div>
          <ActionField onPostClick={handlePostClick} />
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
