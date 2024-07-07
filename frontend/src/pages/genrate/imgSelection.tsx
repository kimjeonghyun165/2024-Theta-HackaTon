import { useState } from "react";
import { DownArrow } from "../../assets/icons";
import { Ex1, RefreshArrow } from "../../assets/imgSelect";
import { CreditLabel } from "../../components/create";
import { useOptionStore } from "../../store/useStore";

const images = [
  { id: 1, component: Ex1 },
  { id: 2, component: Ex1 },
  { id: 3, component: Ex1 },
  { id: 4, component: Ex1 },
];

const ImgSelection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);

  const handleImageSelect = (id: number) => {
    setSelectedImage(id);
  };

  const handleSelect = () => {
    if (selectedImage !== null) {
      setSelectedOption("option3");
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <label key={image.id} className="cursor-pointer">
              <input
                type="radio"
                name="image"
                className="radio hidden"
                checked={selectedImage === image.id}
                onChange={() => handleImageSelect(image.id)}
              />
              <div
                className={`p-2 rounded-3xl ${
                  selectedImage === image.id ? "ring" : ""
                }`}
              >
                <image.component />
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex w-3/4 justify-around gap-1 items-center">
        <div
          className="btn btn-lg bg-fifth/[.13] rounded-2xl w-full"
          onClick={handleSelect}
        >
          Select
        </div>
        <div className="flex flex-col gap-1">
          <div className="btn btn-sm btn-circle p-1 bg-fifth/[.13]">
            <DownArrow />
          </div>
          <div className="btn btn-sm btn-circle p-1 bg-fifth/[.13]">
            <RefreshArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgSelection;
