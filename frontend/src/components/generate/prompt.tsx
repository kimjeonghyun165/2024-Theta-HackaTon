import { useState } from "react";
import CreditLabel from "./common/CreditLabel";
import Loading from "../common/Loading";
import { useFetchUser } from "../../hooks/useUserApi";
import { useGenerateImage } from "../../hooks/useGeneratingApi";
import { useModelStore } from "../../store/useModelStore";

const Prompt = () => {
  const [localPrompt, setLocalPrompt] = useState("");
  const { data: user } = useFetchUser();
  const { mutate: generateImage, isPending } = useGenerateImage();
  const setNewModel = useModelStore((state) => state.setNewModel);

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
    <div className="flex h-full flex-col items-center justify-between py-10 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="flex flex-col items-center w-full gap-6 px-16">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-72 resize-none bg-[#777777]/[.13] rounded-3xl"
          placeholder="EX. a blacksmith bear with elk horn"
          value={localPrompt}
          onChange={handlePromptChange}
          disabled={isPending}
        ></textarea>
        <div className="text-sm text-second/[.49]">
          Tip: if you are generating full body model, try to include "full body
          model"
        </div>
      </div>
      <button
        className="btn btn-lg bg-fifth/[.13] mt-4 rounded-3xl w-1/2 xl:"
        onClick={handleGenerate}
        disabled={isPending}
      >
        {isPending ? <Loading size="sm" /> : "Generate"}
      </button>
    </div>
  );
};

export default Prompt;
