import React from "react";
import ThreeScene from "../components/common/threeScene/ThreeScene";
import { useModalStore } from "../store/useStore";
import { useModelStore } from "../store/useModelStore";
import Customization from "../components/generate/customization";
import EditModal from "../components/common/modal/modelModals/EditModal";
import SuccessModal from "../components/common/modal/successModal/SuccessModal";
import { Header } from "../components/common/layout/Header";
import { Fourth } from "../assets/generate/menu";

const GenerateCustomization: React.FC = () => {
  const editModel = useModelStore((state) => state.editModel);
  const modals = useModalStore((state) => state.modals);

  return (
    <div className="bg-[#030408] flex flex-col  min-h-screen mx-auto min-w-[1500px] max-w-[2400px]">
      <Header />
      <div className="flex flex-grow w-full gap-12 pt-4 pb-4 md:pb-20">
        <div className="h-full mt-10">
          <ul className="gap-6 menu menu-lg bg-base-500">
            <li className={`w-16 m-2 menu-item active`}>
              <label className={`p-3 bg-sixth/[.12]`}>
                <input type="radio" className="hidden" />
                <Fourth selected={true} />
              </label>
            </li>
          </ul>
        </div>
        <div className="flex justify-around w-full gap-4">
          <div className="relative w-2/5 h-full max-w-lg overflow-hidden">
            <Customization />
          </div>
          <div className="w-1/2 h-full">
            <ThreeScene
              backgroundColor={0xffffff}
              backgroundOpacity={0}
              showGrid={true}
              modelPath={editModel?.file}
            />
          </div>
          {editModel && <EditModal mode={"edit"} initialModel={editModel} />}
          <SuccessModal
            isVisible={modals.successModal}
            message={"The model was successfully updated!"}
            refreshUrl={"/model/generate/customization"}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateCustomization;
