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

const Style = () => {
  const { newModel } = useModelStore((state) => ({
    newModel: state.newModel,
  }));
  const { data: user } = useFetchUser();

  const [superResolution, setSuperResolution] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [rangeLabel, setRangeLabel] = useState<"low" | "mid" | "high">("low");

  const { mutate: generateLowPoly, isPending: isPendingLowPoly } =
    useGenerateLowPoly3DModel(rangeLabel);
  const { mutate: generateRealistic, isPending: isPendingRealistic } =
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
    <div className="flex h-full flex-col items-center justify-between py-10 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="flex flex-col w-full gap-3 px-16">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <div className="text-2xl font-semibold text-left text-white">style</div>
        <div>
          <LowPolyCard
            rangeValue={rangeValue}
            handleRangeChange={handleRangeChange}
            handleGenerate={handleGenerateLowPoly}
            isLoading={isPendingLowPoly}
            isDisabled={isPendingLowPoly || isPendingRealistic}
          />
        </div>
        <div className="bottom-0 mt-7">
          <RealisticCard
            superResolution={superResolution}
            setSuperResolution={setSuperResolution}
            handleGenerate={handleGenerateRealistic}
            isLoading={isPendingRealistic}
            isDisabled={isPendingRealistic || isPendingLowPoly}
          />
        </div>
      </div>
    </div>
  );
};

export default Style;
