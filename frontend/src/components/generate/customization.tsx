import CreditLabel from "./common/CreditLabel";
import RefreshArrow from "../../assets/generate/imgSelect/RefreshArrow";
import Shape from "./customization/Shape";
import Stretch from "./customization/Stretch";
import Surface from "./customization/Surface";
import Mirror from "./customization/Mirror";
import Balloon from "./customization/Balloon";
import { useFetchUser } from "../../hooks/useUserApi";
import { ModalKey, useModalStore } from "../../store/useStore";

const Customization = () => {
  const { data: user } = useFetchUser();
  const { openModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
  }));

  const handleOpenModal = () => {
    openModal(ModalKey.EDIT_MODAL);
  };

  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex justify-end w-full">
          <CreditLabel credits={user?.credits ?? 0} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Shape />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Stretch />
        </div>
        <div className="flex justify-between w-full gap-4">
          <Surface />
          <Mirror />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Balloon />
        </div>
      </div>
      <div className="flex items-center justify-around w-3/4 gap-1 mt-4">
        <div
          className="btn btn-lg bg-fifth/[.13] rounded-2xl w-full"
          onClick={handleOpenModal}
        >
          Post
        </div>
        <div className="btn btn-sm btn-circle p-1 bg-fifth/[.13]">
          <RefreshArrow />
        </div>
      </div>
    </div>
  );
};

export default Customization;
