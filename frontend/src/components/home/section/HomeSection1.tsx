import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Anvil from "../../../assets/Anvil";
import { useModelStore } from "../../../store/useModelStore";
import {
  useModalStore,
  useOptionStore,
  ModalKey,
} from "../../../store/useStore";
import Eclipse from "../../../assets/Eclipse";
import Loading from "../../common/Loading";
import { useGenerateImage } from "../../../hooks/useGeneratingApi";
import { useFetchUser } from "../../../hooks/useUserApi";

const HomeSection1 = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { setNewModel } = useModelStore((state) => ({
    setNewModel: state.setNewModel,
  }));
  const { data: user } = useFetchUser();
  const { mutate: generateImage, isPending } = useGenerateImage();

  const handleGenerateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  const openModal = useModalStore((state) => state.openModal);

  const handleGenerate = () => {
    if (!user) {
      openModal(ModalKey.LOGIN_MODAL);
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
            setNewModel({ prompt: prompt, imgSelection: images });
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
          <h1 className="text-4xl lg:text-5xl xl:text-7xl height-small:text-6xl height-small:tracking-[1.1rem] tracking-[1.33rem] tra w-full">
            <p>SMITH ALL</p>
            <p className="tracking-[.05em] mt-4">IMAGINATION</p>
          </h1>
          <h2 className="w-full mt-8 text-base lg:text-base xl:text-3xl height-small:text-3xl">
            THE BEST 3D MODEL GENERATIVE AI
          </h2>
        </div>
        <div className="w-1/2 height-small:w-[34%]">
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
