import { useState } from "react";
import {
  generateLowPoly3DModel,
  generateRealistic3DModel,
} from "../../api/modelApi";
import { CreditLabel } from "../../components/generate";
import { LowPolyCard, RealisticCard } from "../../components/generate/style";
import { useModelStore } from "../../store/useModelStore";
import { useOptionStore } from "../../store/useStore";

const Style = () => {
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));
  const [superResolution, setSuperResolution] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [rangeLabel, setRangeLabel] = useState<"low" | "mid" | "high">("low");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<
    "lowpoly" | "realistic" | null
  >(null);

  const handleGenerateLowPoly = async () => {
    setIsLoading(true);
    setActiveButton("lowpoly");
    if (model && model?.imgSelection !== null) {
      try {
        setModel({ style: { method: "lowpoly", strength: rangeLabel } });
        const data = await generateLowPoly3DModel(
          model?.selectedImage,
          rangeLabel
        );
        setModel({ file: data.model_url, preview: data.preview_url });
        setSelectedOption("option4");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setActiveButton(null);
      }
    }
  };

  const handleGenerateRealistic = async () => {
    setIsLoading(true);
    setActiveButton("realistic");
    if (model && model?.imgSelection !== null) {
      try {
        setModel({
          style: { method: "realistic", superResolution: superResolution },
        });
        const data = await generateRealistic3DModel(
          model?.selectedImage,
          superResolution
        );
        setModel({ file: data.model_url, preview: data.preview_url });
        setSelectedOption("option4");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setActiveButton(null);
      }
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
            isLoading={isLoading && activeButton === "lowpoly"}
            isDisabled={isLoading && activeButton !== "lowpoly"}
          />
        </div>
        <div className="bottom-0 mt-7">
          <RealisticCard
            superResolution={superResolution}
            setSuperResolution={setSuperResolution}
            handleGenerate={handleGenerateRealistic}
            isLoading={isLoading && activeButton === "realistic"}
            isDisabled={isLoading && activeButton !== "realistic"}
          />
        </div>
      </div>
    </div>
  );
};

export default Style;
