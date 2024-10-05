import { useState } from "react";
import { useModelStore } from "../../store/useModelStore";
import LowPolyCard from "./style/LowPolyCard";
import RealisticCard from "./style/RealisticCard";
import CreditLabel from "./common/CreditLabel";
import { useFetchUser } from "../../hooks/useUserApi";
import {
  useGenerateLowPoly3DModel,
  useGenerateRealistic3DModel,
} from "../../hooks/useGeneratingApi";
import { useModelCreateLoadingStore } from "../../store/useStore";

const Style = () => {
  const { newModel } = useModelStore((state) => ({
    newModel: state.newModel,
  }));
  const { data: user } = useFetchUser();
  const { isLoading } = useModelCreateLoadingStore();
  const [superResolution, setSuperResolution] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [rangeLabel, setRangeLabel] = useState<"low" | "mid" | "high">("low");

  const { mutate: generateLowPoly } = useGenerateLowPoly3DModel(rangeLabel);
  const { mutate: generateRealistic } =
    useGenerateRealistic3DModel(superResolution);

  const handleGenerateLowPoly = () => {
    if (newModel && newModel?.imgSelection !== null) {
      generateLowPoly({
        imageUrl: newModel.selectedImage,
        strength: rangeLabel,
      });
    }
  };

  const handleGenerateRealistic = () => {
    if (newModel && newModel?.imgSelection !== null) {
      generateRealistic({
        imageUrl: newModel.selectedImage,
        resolution: superResolution,
      });
    }
  };

  const handleRangeChange = (value: number) => {
    setRangeValue(value);
    setRangeLabel(getValue(value));
  };

  const getValue = (value: number): "low" | "mid" | "high" => {
    switch (value) {
      case 0:
        return "low";
      case 50:
        return "mid";
      case 100:
        return "high";
      default:
        return "low";
    }
  };

  return (
    <div className="flex flex-col h-full w-[90%] items-center py-10 height-small:pb-2 max-w-2xl bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto no-scrollbar">
      <div className="flex flex-col w-full gap-6 px-12 height-small:gap-4">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <div>
          <LowPolyCard
            rangeValue={rangeValue}
            handleRangeChange={handleRangeChange}
            handleGenerate={handleGenerateLowPoly}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
        <div className="mt-8">
          <RealisticCard
            superResolution={superResolution}
            setSuperResolution={setSuperResolution}
            handleGenerate={handleGenerateRealistic}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Style;
