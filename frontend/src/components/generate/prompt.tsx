import { useState } from "react";
import CreditLabel from "./common/CreditLabel";
import Loading from "../common/Loading";
import { useFetchUser } from "../../hooks/useUserApi";
import { useGenerateImage } from "../../hooks/useGeneratingApi";
import { useModelStore } from "../../store/useModelStore";
import { useModelCreateLoadingStore } from "../../store/useStore";

const Prompt = () => {
  const [localPrompt, setLocalPrompt] = useState("");
  const { data: user } = useFetchUser();
  const { mutate: generateImage } = useGenerateImage();
  const { newModel, setNewModel } = useModelStore((state) => ({
    newModel: state.newModel,
    setNewModel: state.setNewModel,
  }));
  const { isLoading } = useModelCreateLoadingStore();

  const handleGenerate = () => {
    if (localPrompt !== "") {
      generateImage({ prompt: localPrompt });
      setNewModel({ prompt: localPrompt });
    }
  };

  const handlePromptChange = (e: any) => {
    const value = e.target.value;
    setLocalPrompt(value);
  };

  return (
    <div className="flex h-full w-[90%] flex-col items-center justify-start py-10 max-w-2xl bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="flex flex-col items-center w-full h-full gap-6 px-16">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>

        <textarea
          className="textarea textarea-bordered textarea-lg height-small:textarea-sm h-full w-full resize-none bg-[#777777]/[.13] rounded-3xl"
          placeholder="EX. a blacksmith bear with elk horn"
          value={newModel.prompt === "" ? localPrompt : newModel.prompt}
          onChange={handlePromptChange}
          disabled={isLoading}
        ></textarea>

        <div className="text-sm text-second/[.49]">
          Tip: if you are generating full body model, try to include "full body
          model"
        </div>
        <button
          className="btn btn-lg w-2/3 bg-fifth/[.13] mt-4 rounded-3xl height-small:btn-md"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default Prompt;
