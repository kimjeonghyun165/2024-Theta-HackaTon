import { Check, Market, Question } from "../../../assets/icons";
import { IconBtn } from "../../../components/common";
import ActionField from "../../../components/common/modal/editModal/ActionField";
import InputField from "../../../components/common/modal/InputField";
import TextAreaField from "../../../components/common/modal/TextAreaField";
import { CreditLabel } from "../../../components/generate";
import { Model, useModelStore } from "../../../store/useModelStore";
import { useUserStore } from "../../../store/useUserStore";
import { mintNFT } from "../../../utils/web3/nft";

const Customization_Temporary = ({ onPostBtnClick }: any) => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { model, setModel, addModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
    addModel: state.addModel,
  }));

  const handlePostClick = async () => {
    if (model) {
      let updatedModel: Model = model;
      if (model.nftDetails.isNft === true) {
        updatedModel = await mintNFT({
          prompt: model.prompt,
          title: model.title,
          description: model.description,
          preview: model.preview,
        });
      }
      try {
        await addModel(updatedModel);
        console.log("Model added successfully");
      } catch (error) {
        console.error("Error adding model:", error);
      }
    }
    onPostBtnClick();
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
        isNft: !model?.nftDetails?.isNft,
      },
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="w-full h-full flex flex-col items-center gap-2">
        <div className="flex w-full justify-end">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <div className="w-full h-full flex flex-col justify-around pt-4">
          <div className="w-full">
            <InputField
              type="text"
              placeholder="Title : "
              value={model?.title || ""}
              onChange={handleTitleChange}
            />
          </div>
          <div className="w-full">
            <TextAreaField
              value={model?.description || ""}
              onChange={handleDescriptionChange}
            />
          </div>
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
          <div className="w-full flex justify-around gap-3">
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
          <div className="w-full">
            <ActionField onPostClick={handlePostClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization_Temporary;
