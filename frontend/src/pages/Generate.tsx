import React from "react";
import ThreeScene from "../components/common/threeScene/ThreeScene";
import { useModalStore, useOptionStore } from "../store/useStore";
import ImgSelection from "../components/generate/imgSelection";
import Prompt from "../components/generate/prompt";
import { useModelStore } from "../store/useModelStore";
import Style from "../components/generate/style";
import { Layout } from "../components/common/layout/generate/Layout";
import AnimatedContent from "../components/generate/common/AnimatedContent";
import Customization from "../components/generate/customization";
import EditModal from "../components/common/modal/modelModals/EditModal";
import SuccessModal from "../components/common/modal/successModal/SuccessModal";

const Generate3DModel: React.FC = () => {
  const selectedOption = useOptionStore((state) => state.selectedOption);
  const newModel = useModelStore((state) => state.newModel);
  const modals = useModalStore((state) => state.modals);

  return (
    <Layout>
      <div className="flex justify-around w-full gap-4 h-[85vh]">
        <div className="relative w-full max-w-lg">
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
            <Customization />
          </AnimatedContent>
        </div>
        <div className="w-1/2 h-full">
          <ThreeScene
            backgroundColor={0xffffff}
            backgroundOpacity={0}
            showGrid={true}
            modelPath={newModel?.file}
          />
        </div>
        <EditModal mode={"create"} />
        <SuccessModal
          isVisible={modals.successModal}
          message={"The model was successfully created!"}
          refreshUrl={"/model/generate"}
        />
      </div>
    </Layout>
  );
};

export default Generate3DModel;
