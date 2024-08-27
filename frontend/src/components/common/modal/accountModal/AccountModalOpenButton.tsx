import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./signUpModal/SignUpModal";
import ModalLayout from "../common/Layout";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import ResetPasswordModal from "./resetPasswordModal/ResetPasswordModal";

const AccountModalOpenButton = () => {
  const [selectOption, setSelectOption] = useState<string>("Login");
  const { modals, openModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
  }));

  const renderModalContent = () => {
    switch (selectOption) {
      case "Login":
        return <LoginModal setSelectOption={setSelectOption} />;
      case "resetPassword":
        return <ResetPasswordModal />;
      case "SignUp":
        return <SignUpModal />;
      default:
        return null;
    }
  };

  const renderOptionButton = (option: string, label: string) => (
    <label className="label cursor-pointer w-full">
      <input
        type="radio"
        aria-label={label}
        className="hidden"
        onClick={() => setSelectOption(option)}
        defaultChecked={selectOption === option}
      />
      <div
        className={`btn btn-lg btn-ghost border-none text-2xl p-4 py-0 rounded-3xl text-white flex items-center justify-center min-w-[140px] h-[48px] ${
          selectOption === option ? "bg-sixteenth" : "bg-none"
        }`}
      >
        {label}
      </div>
    </label>
  );

  return (
    <>
      <button
        className="w-[140px] text-2xl btn btn-ghost"
        onClick={() => openModal(ModalKey.LOGIN_MODAL)}
      >
        Log-In
      </button>
      <ModalLayout
        isVisible={modals.loginModal}
        modalName={ModalKey.LOGIN_MODAL}
        className="flex min-w-[500px] min-h-[550px]"
        className2="w-full flex items-start justify-center mx-auto"
        children2={
          <div className="flex flex-col items-center px-4">
            {renderOptionButton("Login", "Login")}
            {renderOptionButton("SignUp", "Sign Up")}
          </div>
        }
      >
        <div className="w-full flex items-center">{renderModalContent()}</div>
      </ModalLayout>
    </>
  );
};

export default AccountModalOpenButton;
