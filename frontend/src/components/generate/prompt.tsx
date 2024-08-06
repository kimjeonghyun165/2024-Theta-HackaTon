import { useState } from "react";
import { generateImage } from "../../api/modelApi";
import { useToast } from "../common/ToastContext";
import { useModelStore } from "../../store/useModelStore";
import { useOptionStore } from "../../store/useStore";
import { useUserStore } from "../../store/useUserStore";
import CreditLabel from "./common/CreditLabel";
import Loading from "../common/Loading";

const Prompt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToast();
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));
  const { jwtToken, fetchUser, user } = useUserStore((state) => ({
    jwtToken: state.jwtToken,
    fetchUser: state.fetchUser,
    user: state.user,
  }));

  const handleGenerate = async () => {
    setIsLoading(true);
    if (model) {
      if (model.prompt !== "") {
        try {
          setToast({
            message: `Image generation in progress.\nPlease wait up to 1 minute.`,
            type: "info",
            position: "bottom-end",
          });
          const data = await generateImage(jwtToken, model.prompt);
          const images = data.image_urls.map((url: any) => ({
            url,
            selected: false,
          }));
          setModel({ imgSelection: images });
          setSelectedOption("option2");
          fetchUser();
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
      <div className="flex flex-col items-center w-full gap-6 px-16">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full h-72 resize-none bg-[#777777]/[.13] rounded-3xl"
          placeholder="EX. a blacksmith bear with elk horn"
          value={model?.prompt}
          onChange={handlePromptChange}
          disabled={isLoading}
        ></textarea>
        <div className="text-sm text-second/[.49]">
          Tip: if you are generating full body model, try to include "full body
          model"
        </div>
      </div>
      <button
        className="btn btn-lg bg-fifth/[.13] mt-4 rounded-3xl w-1/2 xl:"
        onClick={handleGenerate}
        disabled={isLoading}
      >
        {isLoading ? <Loading size="sm" /> : "Generate"}
      </button>
    </div>
  );
};

export default Prompt;
