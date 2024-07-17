import React, { useEffect, useRef } from "react";
import { Check, Market, Question } from "../../../../assets/icons";
import { useModelStore } from "../../../../store/useModelStore";
import IconBtn from "../../iconBtn";
import ThreeScene from "../../threeScene/main";
import ActionField from "./actionField";
import InputField from "../inputField";
import TextAreaField from "../textAreaField";
import { mintNFT } from "../../../../utils/web3/nft";
import { useFileStore } from "../../../../store/useStore";
import { initializeWeb3 } from "../../../../utils/web3/setWeb3/initializeWeb3";
import { initializeContract } from "../../../../utils/web3/setWeb3/setContract";

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

  const fileUrl = useFileStore((state) => state.fileUrl);

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

  useEffect(() => {
    if (isVisible) {
      initializeWeb3();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handlePostClick = async () => {
    if (model) {
      await mintNFT({
        fileName: "Base_Mesh_LowPoly.fbx",
        prompt: model.prompt,
        title: model.title,
        description: model.description,
        model: model.file,
        preview: model.preview,
      });

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
              modelPath={fileUrl}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-6 px-6">
            <InputField
              value={model?.title || ""}
              onChange={handleTitleChange}
              type={"text"}
              placeholder={"Title : "}
            />
            <TextAreaField
              value={model?.description || ""}
              onChange={handleDescriptionChange}
            />
            <div className="w-full flex justify-between items-center bg-[#1C1C1C]/[.53] pl-4 rounded-full">
              <p className="">Make as NFT?</p>
              <IconBtn icon={Check} bgColor="bg-[#1C1C1C]/[.53]" />
            </div>
            <div className="flex justify-around gap-3">
              <InputField type="text" placeholder="Price: 0.792 ETH" />
              <IconBtn icon={Market} bgColor="bg-[#1C1C1C]/[.53]" />
              <IconBtn icon={Question} bgColor="bg-[#1C1C1C]/[.53]" />
            </div>
            <ActionField onPostClick={handlePostClick} />
          </div>
        </div>
      </div>
      <label className="modal-backdrop"></label>
    </>
  );
};

export default EditModal;
