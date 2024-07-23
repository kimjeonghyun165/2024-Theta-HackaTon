import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateImage } from "../../../api/useApi";
import Anvil from "../../../assets/anvil";
import { Loading } from "../../../components/common";
import TypingEffect from "../../../components/home/typingEffect";
import { useModelStore } from "../../../store/useModelStore";
import { useOptionStore } from "../../../store/useStore";
import { useUserStore } from "../../../store/useUserStore";
import Toast from "../../../components/common/toast"; // Toast 컴포넌트 임포트

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
    <section className="flex flex-col gap-24 h-full">
      {showToast && (
        <Toast
          message="You need to log in first. Please log in."
          type="info"
          position="bottom-end"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex justify-around items-center">
        <div className="w-full">
          <h1 className="flex flex-col font-bold gap-6 ml-6 2xl:ml-12 md:pl-16">
            <p className="text-4xl lg:text-5xl xl:text-6xl tracking-[.3em]">
              SMITH ALL
              <br />
              <p className="mt-4 tracking-[.05em]">IMAGINATION</p>
            </p>
            <TypingEffect />
          </h1>
        </div>
        <div className="w-full">
          <Anvil />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="input input-bordered input-lg input-ghost flex items-center justify-around max-w-xs border-2 border-white rounded-full w-full focus-within:outline-white px-0">
          <input
            type="text"
            placeholder="Key In Prompt:"
            className="grow focus:outline-none rounded-full pl-4"
            value={model?.prompt}
            onChange={handleGenerateChange}
          />
          <div
            className="btn btn-ghost btn-lg rounded-full text-white focus:none px-4 mr-2"
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
