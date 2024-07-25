import { useRef } from "react";
import "../scrollbarStyle.css";
import SettingInformBox from "./SettingInformBox";

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

  const settingsData = [
    {
      title: "Log-in information",
      items: [
        { subtitle: "Email", content: "randomemail@gmail.com" },
        { subtitle: "Current Password", content: "randomemail@gmail.com" },
        { subtitle: "New Password", content: "randomemail@gmail.com" },
      ],
    },
    {
      title: "License information",
      items: [{ subtitle: "License", content: "Commercial" }],
    },
    {
      title: "Language & Region",
      items: [
        { subtitle: "Language", content: "English (USA)", type: "select", options: ["English (USA)", "Korean"] },
        { subtitle: "Region", content: "United States", type: "select", options: ["United States", "Korea"] },
      ],
    },
    {
      title: "Notification Setting",
      items: [
        { subtitle: "Notification", content: "Comment" },
        { subtitle: "", content: "Like" },
        { subtitle: "", content: "Tag" },
      ],
    },
  ];

  return (
    <>
      <button
        className="bg-[#777]/[0.2] rounded-[30px] w-full py-7 text-2xl"
        onClick={openModal}
        aria-label="Open settings modal"
      >
        {children}
      </button>
      <dialog
        ref={modalRef}
        style={{
          background:
            "linear-gradient(180deg, rgba(208, 208, 208, 0.25) 0%, rgba(106, 106, 106, 0.5) 100%)",
        }}
        className="backdrop:bg-[#030408] rounded-[87px] text-white settingModal-scrollbar"
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
        aria-labelledby="settings-dialog"
      >
        <div className="flex w-[1000px] flex-col overflow-y-scroll px-20 py-20">
          <h2 id="settings-dialog" className="text-5xl font-bold">
            Setting
          </h2>
          {settingsData.map((section, index) => (
            <SettingInformBox key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </dialog>
    </>
  );
}

export default SettingButton;