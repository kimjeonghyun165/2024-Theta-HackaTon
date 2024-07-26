import { useState } from "react";
import { generateImage } from "../../api/modelApi";
import { Loading } from "../../components/common";
import { CreditLabel } from "../../components/generate";
import { useModelStore } from "../../store/useModelStore";
import { useOptionStore } from "../../store/useStore";

const Prompt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));

  const handleGenerate = async () => {
    setIsLoading(true);
    if (model) {
      if (model.prompt !== "") {
        try {
          const data = await generateImage(model.prompt);
          const images = data.image_urls.map((url: any) => ({
            url,
            selected: false,
          }));
          setModel({ imgSelection: images });
          setSelectedOption("option2");
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handlePromptChange = (e: any) => {
    const value = e.target.value;
    setModel({ prompt: value });
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="w-full flex flex-col items-center gap-6 px-16">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-80 resize-none bg-[#777777]/[.13] rounded-3xl"
          placeholder="EX. a blacksmith bear with elk horn"
          value={model?.prompt}
          onChange={handlePromptChange}
        ></textarea>
        <div className="text-sm text-second/[.49]">
          Tip: if you are generating full body model, try to include "full body
          model"
        </div>
      </div>
      <button
        className="btn btn-lg bg-fifth/[.13] mt-4 rounded-3xl w-1/2"
        onClick={handleGenerate}
        disabled={isLoading}
      >
        {isLoading ? <Loading size="sm" /> : "Generate"}
      </button>
    </div>
  );
};

export default Prompt;
