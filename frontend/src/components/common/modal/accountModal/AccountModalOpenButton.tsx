import { useRef, useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import ResetPasswordModal from "./ResetPasswordModal";

const AccountModalOpenButton = () => {
  const accountModalRef = useRef<HTMLDialogElement>(null);
  const [selectOption, setSelectOption] = useState<string>("Login");

  const openModal = () => {
    accountModalRef?.current?.showModal();
  };

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === accountModalRef.current) {
      accountModalRef?.current?.close();
    }
  };

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
      <button className="w-[140px] text-2xl btn btn-ghost" onClick={openModal}>
        Log-In
      </button>
      <dialog
        ref={accountModalRef}
        id="login_modal"
        className="modal backdrop-blur-md rounded-3xl"
        onClick={closeModal}
      >
        <div className="w-full flex items-start justify-center mx-auto">
          <div className="flex flex-col items-center z-10 px-4">
            {renderOptionButton("Login", "Login")}
            {renderOptionButton("SignUp", "Sign Up")}
          </div>
          {renderModalContent()}
        </div>
      </dialog>
    </>
  );
};

export default AccountModalOpenButton;
