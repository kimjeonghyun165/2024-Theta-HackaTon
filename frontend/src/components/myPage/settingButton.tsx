import { useRef } from "react";
import SettingInformBox from "./settingInformBox";
import "./scrollbarStyle.css";
function SettingButton({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current === null) return;
    modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current === null) return;
    modalRef.current.close();
  };

  return (
    <>
      <button
        className="bg-[#777]/[0.2] rounded-[30px] w-full py-7 text-2xl"
        onClick={openModal}
      >
        {children}
      </button>
      <dialog
        ref={modalRef}
        style={{
          background:
            "linear-gradient(180deg, rgba(208, 208, 208, 0.25) 0%, rgba(106, 106, 106, 0.5) 100%)",
        }}
        className="backdrop:bg-[#030408] rounded-[87px] text-white  relative"
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
      >
        <div className="flex w-[1000px] flex-col overflow-y-scroll px-20 py-10 settingModal-scrollbar">
          <div>
            <h2 className="text-5xl font-bold">Setting</h2>
          </div>
          <>
            <h3 className="my-3 text-2xl font-extralight">
              Log-in information
            </h3>
            <ul className="flex flex-col gap-7">
              <SettingInformBox>
                Email: randomemail@gmail.com, Current Password:
                randomemail@gmail.com, New Password: randomemail@gmail.com
              </SettingInformBox>
            </ul>
          </>
          <>
            <h3 className="my-3 text-2xl font-extralight">
              License information
            </h3>
            <ul className="flex flex-col">
              <SettingInformBox>License: Commercial</SettingInformBox>
            </ul>
          </>
          <>
            <h3 className="my-3 text-2xl font-extralight">
              Language & RegionSetting
            </h3>
            <ul className="flex flex-col gap-7">
              <SettingInformBox>
                Language: English(USA), Region: United States
              </SettingInformBox>
            </ul>
          </>
          <>
            <h3 className="my-3 text-2xl font-extralight">
              Notification Setting
            </h3>
            <ul className="flex flex-col gap-7">
              <SettingInformBox>
                Notification: Comment, : Like, : Tag
              </SettingInformBox>
            </ul>
          </>
        </div>
      </dialog>
    </>
  );
}

export default SettingButton;
