import { CreditLabel } from "../../components/create";
import { useOptionStore, usePromptStore } from "../../store/useStore";

const Prompt = () => {
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { prompt, setPrompt } = usePromptStore((state) => ({
    prompt: state.prompt,
    setPrompt: state.setPrompt,
  }));

  const handleGenerate = () => {
    if (prompt !== "") {
      setSelectedOption("option2");
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl">
      <div className="w-full flex flex-col items-center gap-6 px-16">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-96 resize-none bg-[#777777]/[.13] rounded-3xl"
          placeholder="EX. a blacksmith bear with elk horn"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <div className="text-sm text-second/[.49]">
          TIP: try to include keyword ‘isolate’ to create outstanding results
        </div>
      </div>
      <div
        className="btn btn-lg bg-fifth/[.13] rounded-3xl w-1/2"
        onClick={handleGenerate}
      >
        Generate
      </div>
    </div>
  );
};

export default Prompt;
