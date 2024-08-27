import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Anvil from "../../../assets/Anvil";
import { useModelStore } from "../../../store/useModelStore";
import { useOptionStore } from "../../../store/useStore";
import { useToast } from "../../common/ToastContext";
import Eclipse from "../../../assets/Eclipse";
import Loading from "../../common/Loading";
import { useGenerateImage } from "../../../hooks/useGeneratingApi";
import { useFetchUser } from "../../../hooks/useUserApi";

const HomeSection1 = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const { setToast } = useToast();
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { setNewModel } = useModelStore((state) => ({
    setNewModel: state.setNewModel,
  }));
  const { data: user } = useFetchUser();
  const { mutate: generateImage, isPending } = useGenerateImage();

  const handleGenerateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerate = () => {
    if (!user) {
      setToast({
        message: `You need to log in first.\nPlease log in.`,
        type: "info",
        position: "bottom-end",
      });
      return;
    }

    if (prompt.trim()) {
      generateImage(
        { prompt },
        {
          onSuccess: (data) => {
            const images = data.image_urls.map((url: any) => ({
              url,
              selected: false,
            }));
            setNewModel({ prompt, imgSelection: images });
            navigate("model/generate");
            setSelectedOption("option2");
          },
          onError: (error) => {
            console.error("Error generating image:", error);
          },
        }
      );
    } else {
      navigate("model/generate");
    }
  };

  return (
    <section className="relative flex flex-col gap-24">
      <div className="flex items-center justify-around">
        <div className="flex flex-col gap-6 ml-6 font-bold 2xl:ml-12 md:pl-16">
          <h1 className="text-4xl lg:text-5xl xl:text-7xl tracking-[1rem] w-full">
            <p>SMITH ALL</p>
            <p className="tracking-[.05em] mt-4">IMAGINATION</p>
          </h1>
          <h2 className="w-full mt-8 text-base lg:text-base xl:text-3xl">
            THE BEST 3D MODEL GENERATIVE AI
          </h2>
        </div>
        <div className="w-1/2">
          <Anvil />
        </div>
        <div className="absolute w-[1100px] -bottom-[500px] -z-20">
          <Eclipse />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="flex items-center justify-around px-0 border-2 border-white rounded-full input input-bordered input-lg input-ghost focus-within:outline-white">
          <input
            type="text"
            placeholder="Key In Prompt:"
            className="pl-4 rounded-full grow focus:outline-none"
            value={prompt}
            onChange={handleGenerateChange}
            disabled={isPending}
          />
          <button
            className="px-4 text-white rounded-full btn btn-ghost btn-lg focus:none"
            onClick={handleGenerate}
            disabled={isPending}
          >
            {isPending ? <Loading size="sm" /> : "Generate"}
          </button>
        </label>
      </div>
    </section>
  );
};

export default HomeSection1;
