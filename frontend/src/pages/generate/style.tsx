import { useState } from "react";
import {
  useGenerateRealistic3DModel,
  useGenerateLowPoly3DModel,
} from "../../hooks/api/useModelApi";
import { CreditLabel } from "../../components/generate";
import { LowPolyCard, RealisticCard } from "../../components/generate/style";
import { useModelStore } from "../../store/useModelStore";
import { useOptionStore } from "../../store/useStore";
import { useToast } from "../../components/common/Toast/ToastContext";

const Style = () => {
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));
  const [superResolution, setSuperResolution] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [rangeLabel, setRangeLabel] = useState<"low" | "mid" | "high">("low");

  const { setToast } = useToast();

  const { mutate: generateLowPoly, isPending: isLoadingLowPoly } =
    useGenerateLowPoly3DModel();
  const { mutate: generateRealistic, isPending: isLoadingRealistic } =
    useGenerateRealistic3DModel();

  const handleGenerateLowPoly = () => {
    if (model && model?.imgSelection !== null) {
      generateLowPoly(
        { imageUrl: model.selectedImage, strength: rangeLabel },
        {
          onSuccess: (data: { model_url: string; preview_url: string }) => {
            setModel({
              file: data.model_url,
              preview: data.preview_url,
              style: { method: "lowpoly", strength: rangeLabel },
            });
            setSelectedOption("option4");
          },
          onError: (error: any) => {
            setToast({
              message: `Error generating low poly model: ${error.message}`,
              type: "error",
              position: "bottom-end",
            });
          },
        }
      );
    }
  };

  const handleGenerateRealistic = () => {
    if (model && model?.imgSelection !== null) {
      generateRealistic(
        { imageUrl: model.selectedImage, resolution: superResolution },
        {
          onSuccess: (data: { model_url: string; preview_url: string }) => {
            setModel({
              file: data.model_url,
              preview: data.preview_url,
              style: { method: "realistic", superResolution: superResolution },
            });
            setSelectedOption("option4");
          },
          onError: (error: any) => {
            setToast({
              message: `Error generating realistic model: ${error.message}`,
              type: "error",
              position: "bottom-end",
            });
          },
        }
      );
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
      <div className="w-full flex flex-col gap-3 px-16">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <div className="text-2xl text-white font-semibold text-left">style</div>
        <div>
          <LowPolyCard
            rangeValue={rangeValue}
            handleRangeChange={handleRangeChange}
            handleGenerate={handleGenerateLowPoly}
            isLoading={isLoadingLowPoly}
            isDisabled={isLoadingLowPoly || isLoadingRealistic}
          />
        </div>
        <div className="bottom-0 mt-7">
          <RealisticCard
            superResolution={superResolution}
            setSuperResolution={setSuperResolution}
            handleGenerate={handleGenerateRealistic}
            isLoading={isLoadingRealistic}
            isDisabled={isLoadingRealistic || isLoadingLowPoly}
          />
        </div>
      </div>
    </div>
  );
};

export default Style;
