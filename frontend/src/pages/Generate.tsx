import React, { useState, useEffect } from "react";
import ThreeScene from "../components/common/threeScene/ThreeScene";
import { useOptionStore } from "../store/useStore";
import ImgSelection from "../components/generate/imgSelection";
import Prompt from "../components/generate/prompt";
import { useNavigate } from "react-router-dom";
import Customization_Temporary from "../components/generate/temporary/customization";
import { useModelStore } from "../store/useModelStore";
import Style from "../components/generate/style";
import { Layout } from "../components/common/layout/generate/Layout";
import AnimatedContent from "../components/generate/common/AnimatedContent";
import SuccessModal from "../components/common/modal/successModal/SuccessModal";

const Generate3DModel: React.FC = () => {
  const selectedOption = useOptionStore((state) => state.selectedOption);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  
  const model = useModelStore((state) => state.model);
  const navigate = useNavigate();

  useEffect(() => {
    const successModal = document.getElementById(
      "success_modal"
    ) as HTMLDialogElement;

    if (successModal) {
      if (isSecondModalVisible) {
        successModal.showModal();
      } else {
        successModal.close();
      }
    }
  }, [isSecondModalVisible]);

  const handleOpenSecondModal = () => setSecondModalVisible(true);
  const handleCloseSecondModal = () => {
    setSecondModalVisible(false);
    navigate("/model/generate");
  };

  const handlePostAndOpenNext = () => {
    handleOpenSecondModal();
  };

  return (
    <Layout>
      <div className="flex justify-around w-full gap-4">
        <div className="relative w-2/5 h-full max-w-lg overflow-hidden">
          <AnimatedContent isVisible={selectedOption === "option1"}>
            <Prompt />
          </AnimatedContent>
          <AnimatedContent isVisible={selectedOption === "option2"}>
            <ImgSelection />
          </AnimatedContent>
          <AnimatedContent isVisible={selectedOption === "option3"}>
            <Style />
          </AnimatedContent>
          <AnimatedContent isVisible={selectedOption === "option4"}>
            <Customization_Temporary onPostBtnClick={handlePostAndOpenNext} />
          </AnimatedContent>
        </div>
        <div className="w-1/2 h-full">
          <ThreeScene
            backgroundColor={0xffffff}
            backgroundOpacity={0}
            showGrid={true}
            modelPath={model?.file}
          />
        </div>
        <SuccessModal
          isVisible={isSecondModalVisible}
          onClose={handleCloseSecondModal}
        />
      </div>
    </Layout>
  );
};

export default Generate3DModel;
