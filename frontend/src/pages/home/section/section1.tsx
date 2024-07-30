import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateImage } from "../../../api/modelApi";
import Anvil from "../../../assets/Anvil";
import { Loading } from "../../../components/common";
import { useModelStore } from "../../../store/useModelStore";
import { useOptionStore } from "../../../store/useStore";
import { useUserStore } from "../../../store/useUserStore";
import { useToast } from "../../../components/common/Toast/ToastContext";

const Section1 = () => {
  const navigate = useNavigate();
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

  const handleGenerateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel({ prompt: e.target.value });
  };

  const handleGenerate = async () => {
    if (!user) {
      setToast({
        message: `You need to log in first.\nPlease log in.`,
        type: "info",
        position: "bottom-end",
      });
      return;
    }
    setIsLoading(true);
    if (model) {
      if (model.prompt !== "") {
        try {
          setToast({
            message: `Image generation in progress. Please wait up to 1 minute.`,
            type: "info",
            position: "bottom-end",
          });
          const data = await generateImage(jwtToken, model.prompt);
          const images = data.image_urls.map((url: any) => ({
            url,
            selected: false,
          }));
          setModel({ imgSelection: images });
          fetchUser();
          navigate("model/generate");
          setSelectedOption("option2");
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate("model/generate");
      }
    }
  };

  return (
    <section className="flex flex-col h-full gap-24">
      <div className="flex items-center justify-around">
        <div className="w-full">
          <h1 className="flex flex-col gap-6 ml-6 font-bold 2xl:ml-12 md:pl-16">
            <span className="text-4xl lg:text-5xl xl:text-6xl tracking-[.3em]">
              SMITH ALL
              <br />
              <p className="mt-4 tracking-[.05em]">IMAGINATION</p>
            </span>
            {/* <TypingEffect /> */}
          </h1>
        </div>
        <div className="w-full">
          <Anvil />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="flex items-center justify-around px-0 border-2 border-white rounded-full input input-bordered input-lg input-ghost focus-within:outline-white">
          <input
            type="text"
            placeholder="Key In Prompt:"
            className="pl-4 rounded-full grow focus:outline-none"
            value={model?.prompt}
            onChange={handleGenerateChange}
            disabled={isLoading}
          />
          <button
            className="px-4 text-white rounded-full btn btn-ghost btn-lg focus:none"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? <Loading size="sm" /> : "Generate"}
          </button>
        </label>
      </div>
    </section>
  );
};

export default Section1;
