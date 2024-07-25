import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Ex1 } from "../../assets/imgSelect";
import EditProfileModelButton from "./userProfile/EditProfileModelButton";
import Plan from "./userProfile/Plan";
import Edit from "../../assets/icons/edit";
import SettingButton from "./userProfile/SettingButton";
import AchievementsBoxes from "./userProfile/AchievementsBoxes";


const UserProfile = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const shortenUserName = (address: string | undefined) => {
    if (typeof address === "undefined") {
      throw new Error("user Name Error");
    }
    if (address.length >= 20) {
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    } else {
      return address;
    }
  };
  const [modelName, setModelName] = useState(shortenUserName(user?.username));
  const [isClickedEditName, setIsClickedEditName] = useState(false);
  const handleClickEditName = () => {
    setIsClickedEditName((prev) => !prev);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickEditName();
    }
  };

  return (
    <section className="flex gap-14 bg-[#D0D0D0]/[.07] rounded-[30px] px-20 py-20">
    <div
      className="flex-1 rounded-[30px] relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(36, 72, 98, 0.09) 0%, rgba(255, 255, 255, 0.27) 55.1%, rgba(255, 255, 255, 0.27) 63.6%, rgba(36, 72, 98, 0.3) 100%)",
      }}
    >
      <Ex1 aria-label="Model Image" />
      <EditProfileModelButton aria-label="Edit my model" />
    </div>
    <div className="flex flex-col justify-between flex-1 gap-16">
      <div className="flex flex-col gap-3">
        <h1 className="flex items-center gap-2 text-2xl">
          <Plan plan={user?.plan} />
        </h1>
        <h2 className="relative flex items-center text-5xl h-[60px]" aria-label="User name">
          {isClickedEditName ? (
            <input
              type="text"
              placeholder="Change Name"
              onChange={(e) => setModelName(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
              className="bg-[#777777]/[0.2] w-4/5 h-[60px] input-lg rounded-lg p-3"
              aria-label="Edit user name input"
            />
          ) : (
            modelName
          )}
          <button
            className="absolute right-0 bottom-[50%]"
            onClick={handleClickEditName}
            aria-label="Edit user name button"
          >
            <Edit />
          </button>
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl">Achievements</h3>
          <AchievementsBoxes>
            GENERATION: {user?.models?.length},
            LIKES: 101,
            SALES: 1K
          </AchievementsBoxes>
      </div>
      <div className="flex mt-10 gap-7">
        <button
          className="bg-[#777]/[0.2] rounded-[30px] w-full py-7 text-2xl"
          aria-label="Management"
        >
          Management
        </button>
        <SettingButton aria-label="Setting">Setting</SettingButton>
      </div>
    </div>
  </section>
  )
}

export default UserProfile