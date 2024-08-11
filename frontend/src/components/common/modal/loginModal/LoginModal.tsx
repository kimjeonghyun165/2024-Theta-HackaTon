import React, { useEffect, useRef } from "react";
import { Apple } from "../../../../assets/login/Apple";
import { Google } from "../../../../assets/login/Google";
import { Facebook } from "../../../../assets/login/Facebook";
import IconBtn from "../../IconBtn";
import InputField from "../InputField";
import { login } from "../../../../api/userApi";
import { useUserStore } from "../../../../store/useUserStore";

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  // const { user, fetchUser } = useUserStore((state) => ({
  //   user: state.user,
  //   fetchUser: state.fetchUser,
  // }));

  // const handleLogin = async () => {
  //   const user = await login() // sso login할 시 로직 구성.

  // }

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      if (isVisible) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isVisible]);

  return (
    <dialog
      ref={modalRef}
      id="login_modal"
      className="modal backdrop-blur-sm rounded-3xl"
    >
      <div className="absolute">
        <div className="btn">Login</div>
      </div>
      <div className="modal-box flex flex-col items-center text-center bg-sixteenth gap-6 px-16 py-20">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text ml-7 text-white">Email</span>
          </div>
          <InputField
            type="text"
            placeholder="anvil3dai@gmail.com"
            className="py-7 pl-8"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text ml-7 text-white">Password</span>
          </div>
          <InputField
            type="text"
            placeholder="Enter Password"
            className="py-7 pl-8"
          />
        </label>
        <div className="mt-7 w-full">
          <div className="btn btn-xl text-xl w-full rounded-full text-white">
            Login
          </div>
          <div className="flex mt-2 gap-1 text-xs justify-center">
            <span>Forgotten your password?</span>
            <a className="text-[#A1B0FF]" href="/">
              Reset Password
            </a>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="divider text-xs text-second/[.5]">
              or continue with
            </div>
            <div className="flex justify-around">
              <IconBtn
                icon={Google}
                bgColor={"bg-[#1C1C1C]/[.53]"}
                size={"p-2"}
                onClick={() => login()}
              />
              <IconBtn
                icon={Facebook}
                bgColor={"bg-[#1C1C1C]/[.53]"}
                size={"p-2"}
              />
              <IconBtn
                icon={Apple}
                bgColor={"bg-[#1C1C1C]/[.53]"}
                size={"p-2"}
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default LoginModal;
