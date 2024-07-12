import React, { useState } from "react";
import { Layout } from "../../components/common/layout/create/layout";
import ThreeScene from "../../components/common/threeScene/main";
import { useOptionStore } from "../../store/useStore";
import ImgSelection from "./imgSelection";
import Customization from "./customization";
import Prompt from "./prompt";
import { AnimatedContent } from "../../components/generate";
import SecondModal from "../../components/common/modal/successModal/secondModal";
import FirstModal from "../../components/common/modal/editModal/editModal";

const Generate3DModel: React.FC = () => {
  const selectedOption = useOptionStore((state) => state.selectedOption);

  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  const handleOpenFirstModal = () => setFirstModalVisible(true);
  const handleCloseFirstModal = () => setFirstModalVisible(false);

  const handleOpenSecondModal = () => setSecondModalVisible(true);
  const handleCloseSecondModal = () => setSecondModalVisible(false);

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
            <Customization onPostBtnClick={handleOpenFirstModal} />
          </AnimatedContent>
        </div>
        <div className="w-3/5">
          <ThreeScene
            backgroundColor={0x000000}
            backgroundOpacity={100}
            showGrid={true}
            modelPath={
              "https://gateway.pinata.cloud/ipfs/Qmbj6DwoZkKi9RkphF18ZyjGXYFs3AR2RKKNGN9gZe1LRg"
            }
          />
        </div>
        <FirstModal
          isVisible={isFirstModalVisible}
          onClose={handleCloseFirstModal}
          onOpenNextModal={handleOpenSecondModal}
        />
        <SecondModal
          isVisible={isSecondModalVisible}
          onClose={handleCloseSecondModal}
        />
      </div>
    </Layout>
  );
};

export default Generate3DModel;
