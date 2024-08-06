import { useState } from "react";
import { generateImage } from "../../api/modelApi";
import { DownArrow } from "../../assets/icons";
import { useModelStore } from "../../store/useModelStore";
import { useOptionStore } from "../../store/useStore";
import { useUserStore } from "../../store/useUserStore";
import CreditLabel from "./common/CreditLabel";
import Skeleton from "../common/Skeleton";
import Loading from "../common/Loading";
import RefreshArrow from "../../assets/generate/imgSelect/RefreshArrow";

interface ImageLoadingState {
  [url: string]: boolean;
}

const ImgSelection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));
  const { jwtToken, fetchUser, user } = useUserStore((state) => ({
    jwtToken: state.jwtToken,
    fetchUser: state.fetchUser,
    user: state.user,
  }));

  const handleImageSelect = (url: string) => {
    if (model) {
      const updatedImages = model.imgSelection.map((img) =>
        img.url === url
          ? { ...img, selected: true }
          : { ...img, selected: false }
      );
      setModel({
        imgSelection: updatedImages,
        selectedImage: url,
      });
    }
  };

  const handleImageLoad = (url: string) => {
    setImageLoading((prevState) => ({ ...prevState, [url]: false }));
  };

  const handleRefreshGenerate = async () => {
    setIsLoading(true);
    if (model) {
      const initialLoadingState: ImageLoadingState = {};
      model.imgSelection.forEach((image) => {
        initialLoadingState[image.url] = true;
      });
      setImageLoading(initialLoadingState);
      if (model.prompt !== "") {
        try {
          const data = await generateImage(jwtToken, model.prompt);
          const images = data.image_urls.map((url: any) => ({
            url,
            selected: false,
          }));
          fetchUser();
          setModel({ imgSelection: images });
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          model.imgSelection.forEach((image) => {
            initialLoadingState[image.url] = false;
          });
        }
      }
    }
  };

  const handleSelect = async () => {
    if (model && model?.imgSelection !== null) {
      try {
        setSelectedOption("option3");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    if (model) {
      link.href = model.selectedImage;
      link.download = model.title + ".png";
      link.click();
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="flex flex-col items-center w-full gap-6">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {model?.imgSelection.map((image, index) => (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="image"
                className="hidden radio"
                checked={model?.selectedImage === image.url}
                onChange={() => handleImageSelect(image.url)}
              />
              <div
                className={`p-2 rounded-3xl ${
                  model?.selectedImage === image.url ? "ring" : ""
                }`}
              >
                {imageLoading[image.url] ? (
                  <Skeleton />
                ) : (
                  <img
                    src={image.url}
                    alt={`Generated ${index}`}
                    className="rounded-3xl"
                    onLoad={() => handleImageLoad(image.url)}
                  />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-around w-3/4 gap-1">
        <button
          className="btn btn-lg bg-fifth/[.13] rounded-2xl w-full"
          onClick={handleSelect}
        >
          Select
        </button>
        <div className="flex flex-col gap-1">
          <div
            className="btn btn-sm btn-circle p-1 bg-fifth/[.13]"
            onClick={handleDownload}
          >
            <DownArrow />
          </div>
          <div
            className="btn btn-sm btn-circle p-1 bg-fifth/[.13]"
            onClick={handleRefreshGenerate}
          >
            {isLoading ? <Loading size="xs" /> : <RefreshArrow />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgSelection;
