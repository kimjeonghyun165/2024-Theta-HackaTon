import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateImage } from "../../../api/modelApi";
import Anvil from "../../../assets/anvil";
import { Loading } from "../../../components/common";
import { useModelStore } from "../../../store/useModelStore";
import { useOptionStore } from "../../../store/useStore";
import { useUserStore } from "../../../store/useUserStore";
import Toast from "../../../components/common/Toast";

const Section1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); // 알림 상태 추가
  const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
  const { model, setModel } = useModelStore((state) => ({
    model: state.model,
    setModel: state.setModel,
  }));
  const user = useUserStore((state) => state.user);

  const handleGenerateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel({ prompt: e.target.value });
  };

  const handleGenerate = async () => {
    if (!user) {
      setShowToast(true);
      return;
    }
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
      {showToast && (
        <Toast
          message="You need to log in first. Please log in."
          type="info"
          position="bottom-end"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex items-center justify-around">
        <div className="w-full">
          <h1 className="flex flex-col gap-6 ml-6 font-bold 2xl:ml-12 md:pl-16">
            <p className="text-4xl lg:text-5xl xl:text-6xl tracking-[.3em]">
              SMITH ALL
              <br />
              <p className="mt-4 tracking-[.05em]">IMAGINATION</p>
            </p>
            {/* <TypingEffect /> */}
          </h1>
        </div>
        <div className="w-full">
          <Anvil />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="flex items-center justify-around w-full max-w-xs px-0 border-2 border-white rounded-full input input-bordered input-lg input-ghost focus-within:outline-white">
          <input
            type="text"
            placeholder="Key In Prompt:"
            className="pl-4 rounded-full grow focus:outline-none"
            value={model?.prompt}
            onChange={handleGenerateChange}
          />
          <div
            className="px-4 mr-2 text-white rounded-full btn btn-ghost btn-lg focus:none"
            onClick={handleGenerate}
          >
            {isLoading ? <Loading size="sm" /> : "Generate"}
          </div>
        </label>
      </div>
    </section>
  );
};

export default Section1;
