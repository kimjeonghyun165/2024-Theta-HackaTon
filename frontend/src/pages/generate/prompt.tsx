import { useEffect } from "react";
import { CreditLabel } from "../../components/generate";
import { useModelStore } from "../../store/useModelStore";
import { useOptionStore } from "../../store/useStore";

const Prompt = () => {
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));

  const savePromptToSessionStorage = (value: any) => {
    sessionStorage.setItem("prompt", value);
  };

  useEffect(() => {
    const savedPrompt = sessionStorage.getItem("prompt");
    if (savedPrompt) {
      setModel({ prompt: savedPrompt });
    }
  }, [setModel]);

  const handleGenerate = () => {
    if (model?.prompt !== "") {
      setSelectedOption("option2");
      savePromptToSessionStorage(prompt);
    }
  };

  const handlePromptChange = (e: any) => {
    const value = e.target.value;
    setModel({ prompt: value });
    savePromptToSessionStorage(value);
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="w-full flex flex-col items-center gap-6 px-16">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-96 resize-none bg-[#777777]/[.13] rounded-3xl"
          placeholder="EX. a blacksmith bear with elk horn"
          value={model?.prompt}
          onChange={handlePromptChange}
        ></textarea>
        <div className="text-sm text-second/[.49]">
          TIP: try to include keyword ‘isolate’ to create outstanding results
        </div>
      </div>
      <div
        className="btn btn-lg bg-fifth/[.13] mt-4 rounded-3xl w-1/2"
        onClick={handleGenerate}
      >
        Generate
      </div>
    </div>
  );
};

export default Prompt;
