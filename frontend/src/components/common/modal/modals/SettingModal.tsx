import { settingsData } from "../../../../constant/setting";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import ModalLayout from "../common/Layout";
import SettingInformBox from "./SettingInformBox";

const SettingModal = () => {
  const { modals, openModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
  }));
  return (
    <>
      <button
        className="bg-[#777]/[0.2] rounded-[30px] w-full py-4 text-sm xl:text-lg"
        onClick={() => openModal(ModalKey.SETTING_MODAL)}
      >
        setting
      </button>
      <ModalLayout
        isVisible={modals.settingModal}
        modalName={ModalKey.SETTING_MODAL}
        className={"min-h-[500px] min-w-[950px]"}
      >
        <div className="flex flex-col items-start w-full">
          <div className="text-3xl font-bold">Setting</div>
          <div className="w-full overflow-auto">
            {settingsData.map((section, index) => (
              <SettingInformBox
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default SettingModal;
