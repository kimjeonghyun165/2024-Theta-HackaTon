import React from "react";
import { ImgSelection } from "../../../components/create/imgSelection";
import Prompt from "../../../components/create/prompt";
import { Layout } from "../../../components/common/layout/create/layout";
import ThreeScene from "../../../components/common/threeScene/main";
import useStore from "../../../store/useStore";
import AnimatedContent from "../../../components/create/animatedContent";
import Customization from "../../../components/create/\bcustomization/customization";

const Create3DModel: React.FC = () => {
  const selectedOption = useStore((state) => state.selectedOption);

  return (
    <Layout>
      <div className="flex w-full justify-around gap-4">
        <div className="h-full w-2/5 max-w-lg relative overflow-hidden">
          <AnimatedContent isVisible={selectedOption === "option1"}>
            <Prompt />
          </AnimatedContent>
          <AnimatedContent isVisible={selectedOption === "option2"}>
            <ImgSelection />
          </AnimatedContent>
          <AnimatedContent isVisible={selectedOption === "option3"}>
            <Customization />
          </AnimatedContent>
        </div>
        <div className="w-3/5">
          <ThreeScene />
        </div>
      </div>
    </Layout>
  );
};

export default Create3DModel;
