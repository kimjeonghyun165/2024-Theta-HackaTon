import React, { useState, useEffect } from "react";
import { Layout } from "../../components/common/layout/generate/layout";
import ThreeScene from "../../components/common/threeScene/threeScene";
import { useFileStore, useOptionStore } from "../../store/useStore";
import ImgSelection from "./imgSelection";
import Customization from "./customization";
import Prompt from "./prompt";
import { AnimatedContent } from "../../components/generate";
import { EditModal, SuccessModal } from "../../components/common/modal";
import { useNavigate } from "react-router-dom";

const Generate3DModel: React.FC = () => {
  const selectedOption = useOptionStore((state) => state.selectedOption);
  const fileUrl = useFileStore((state) => state.fileUrl);
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const editModal = document.getElementById(
      "edit_modal"
    ) as HTMLDialogElement;
    const successModal = document.getElementById(
      "success_modal"
    ) as HTMLDialogElement;

    if (editModal) {
      if (isFirstModalVisible) {
        editModal.showModal();
      } else {
        editModal.close();
      }
    }

    if (successModal) {
      if (isSecondModalVisible) {
        successModal.showModal();
      } else {
        successModal.close();
      }
    }

    console.log(isSecondModalVisible);
  }, [isFirstModalVisible, isSecondModalVisible]);

  const handleOpenFirstModal = () => setFirstModalVisible(true);
  const handleCloseFirstModal = () => setFirstModalVisible(false);
  const handleOpenSecondModal = () => setSecondModalVisible(true);
  const handleCloseSecondModal = () => {
    setSecondModalVisible(false);
    navigate("/model/generate");
  };

  const handlePostAndOpenNext = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };

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
        <div className="h-full w-1/2">
          <ThreeScene
            backgroundColor={0xffffff}
            backgroundOpacity={0}
            showGrid={true}
            modelPath={fileUrl}
          />
        </div>
        <EditModal
          isVisible={isFirstModalVisible}
          onClose={handleCloseFirstModal}
          onPostAndOpenNext={handlePostAndOpenNext}
        />
        <SuccessModal
          isVisible={isSecondModalVisible}
          onClose={handleCloseSecondModal}
        />
      </div>
    </Layout>
  );
};

export default Generate3DModel;
