import { useRef, useState } from 'react'
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ResetPasswordModal from './ResetPasswordModal';

const AccountModalOpenButton = () => {
  const accountModalRef = useRef<HTMLDialogElement>(null);
  const [selectOption, setSelectOption] = useState<string>("Login");
  return (
    <>
      <button className="w-[140px] text-2xl btn btn-ghost" onClick={() => accountModalRef?.current?.showModal()} > Log - In</button >
      <dialog
        ref={accountModalRef}
        id="login_modal"
        className="modal backdrop-blur-md rounded-3xl"
        onClick={(e) => { e.target === accountModalRef.current ? accountModalRef?.current?.close() : null }}
      >
        <div className="absolute top-0 z-10 gap-20 py-5">
          <button
            className={`text-3xl border-b-2 mr-10 ${selectOption === "Login" ? "text-white border-b-white" : "text-white border-b-transparent hover:border-b-gray-700"}`}
            onClick={() => setSelectOption("Login")}
          >
            Login
          </button>
          <button className={`text-3xl border-b-2 ${selectOption === "SignUp" ? "text-white border-b-white" : "text-white border-b-transparent hover:border-b-gray-700"}`} onClick={() => setSelectOption("SignUp")}>Sign Up</button>
        </div>
        <div className='w-1/2 mx-auto'>
          {selectOption === "Login" ? <LoginModal setSelectOption={setSelectOption} /> : selectOption === "resetPassword" ? <ResetPasswordModal /> : <SignUpModal />}
        </div>
      </dialog>
    </>
  )
}

export default AccountModalOpenButton