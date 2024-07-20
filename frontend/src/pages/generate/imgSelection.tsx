import { DownArrow } from "../../assets/icons";
import { Ex1, RefreshArrow } from "../../assets/imgSelect";
import { CreditLabel } from "../../components/generate";
import { useModelStore } from "../../store/useModelStore";
import { useFileStore, useOptionStore } from "../../store/useStore";

const images = [
  { id: 1, component: Ex1, url: "http:output1.png" },
  { id: 2, component: Ex1, url: "http:output2.png" },
  { id: 3, component: Ex1, url: "http:output3.png" },
  { id: 4, component: Ex1, url: "http:output4.png" },
];

const ImgSelection = () => {
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const fetchFileUrl = useFileStore((state) => state.fetchFileUrl);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));

  const handleImageSelect = (url: string) => {
    setModel({ imgSelection: url });
  };

  const handleSelect = async () => {
    if (model?.imgSelection !== null) {
      await fetchFileUrl("Base_Mesh_LowPoly.fbx");
      setSelectedOption("option3");
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
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
                checked={model?.imgSelection === image.url}
                onChange={() => handleImageSelect(image.url)}
              />
              <div
                className={`p-2 rounded-3xl ${
                  model?.imgSelection === image.url ? "ring" : ""
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
