import { DownArrow } from "../../assets/icons";
import { useModelStore } from "../../store/useModelStore";
import {
  useModelCreateLoadingStore,
  useOptionStore,
} from "../../store/useStore";
import CreditLabel from "./common/CreditLabel";
import Skeleton from "../common/Skeleton";
import RefreshArrow from "../../assets/generate/imgSelect/RefreshArrow";
import { useFetchUser } from "../../hooks/useUserApi";
import { useGenerateImage } from "../../hooks/useGeneratingApi";
import IconBtn from "../common/IconBtn";

const ImgSelection = () => {
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { newModel, setNewModel } = useModelStore((state) => ({
    newModel: state.newModel,
    setNewModel: state.setNewModel,
  }));
  const { data: user } = useFetchUser();

  const { mutate: generateImage } = useGenerateImage();
  const { isLoading } = useModelCreateLoadingStore();
  const handleImageSelect = (url: string) => {
    if (newModel) {
      const updatedImages = newModel.imgSelection.map((img) =>
        img.url === url
          ? { ...img, selected: true }
          : { ...img, selected: false }
      );
      setNewModel({
        imgSelection: updatedImages,
        selectedImage: url,
      });
    }
  };

  const handleRefreshGenerate = () => {
    if (newModel && newModel.prompt !== "") {
      generateImage({
        prompt: newModel.prompt,
      });
    }
  };

  const handleSelect = async () => {
    if (newModel && newModel?.imgSelection !== null) {
      setSelectedOption("option3");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (newModel) {
      link.href = newModel.selectedImage;
      link.download = newModel.title + ".png";
      link.click();
    }
  };

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-between py-10 px-16 max-w-2xl height-small:text-sm bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="flex flex-col items-center w-full gap-6">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {newModel?.imgSelection.map((image, index) => (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="image"
                className="hidden radio"
                checked={newModel?.selectedImage === image.url}
                disabled={isLoading}
                onChange={() => handleImageSelect(image.url)}
              />
              <div
                className={`p-2 rounded-3xl ${
                  newModel?.selectedImage === image.url ? "ring" : ""
                }`}
              >
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <img
                    src={image.url}
                    alt={`Generated ${index}`}
                    className="rounded-3xl"
                  />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-around w-3/4 gap-1">
        <button
          className="generate-button "
          onClick={handleSelect}
          disabled={isLoading}
        >
          Select
        </button>
        <div className="flex flex-col gap-1">
          <IconBtn
            icon={DownArrow}
            className="btn-sm btn-circle height-small:p-2 p-1 bg-fifth/[.13]"
            onClick={handleDownload}
            disabled={isLoading}
            tooltip="Downlaod Image"
          />
          <IconBtn
            icon={RefreshArrow}
            isLoading={isLoading}
            className="btn-sm height-small:p-2 btn-circle p-1 bg-fifth/[.13]"
            onClick={handleRefreshGenerate}
            tooltip="Regenerate 2D Image"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ImgSelection;
