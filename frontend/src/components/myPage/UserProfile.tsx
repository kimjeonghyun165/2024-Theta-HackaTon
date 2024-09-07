import { useState, useEffect } from "react";
import Plan from "./userProfile/Plan";
import Edit from "../../assets/icons/Edit";
import SettingModal from "../common/modal/modals/SettingModal";
import AchievementsBoxes from "./userProfile/AchievementsBoxes";
import { useFetchUser, useUpdateUser } from "../../hooks/useUserApi";
import { UpdateUserDto } from "../../interfaces/user.interface";
import EditProfileModal from "../common/modal/modals/EditProfileModal";

const UserProfile = () => {
  const { data: user } = useFetchUser();
  const { mutate: updateUser } = useUpdateUser();
  const [userName, setuserName] = useState(user?.username || "");
  const [isClickedEditName, setIsClickedEditName] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setuserName(user.username);
    }
  }, [user?.username]);

  const handleClickEditName = () => {
    if (
      isClickedEditName &&
      userName.trim() !== "" &&
      userName !== user?.username
    ) {
      const updateUserDto: UpdateUserDto = { username: userName };
      updateUser(updateUserDto);
    }
    setIsClickedEditName((prev) => !prev);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickEditName();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(e.target.value);
  };

  return (
    <section className="flex gap-10 bg-[#D0D0D0]/[.07] rounded-3xl px-14 py-20">
      <div className="rounded-3xl flex flex-1 justify-end w-full relative overflow-hidden">
        <img
          src={user?.profileImg}
          alt="Model Image"
          className="absolute w-full h-full bg-MyPageProfileBackground"
        />
        <EditProfileModal />
      </div>
      <div className="flex flex-col w-full h-full gap-5 flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Plan plan={user?.plan} />
          </div>
          {isClickedEditName ? (
            <input
              type="text"
              placeholder="Change Name"
              value={userName}
              onChange={handleChange}
              onKeyDown={handleEnter}
              className="bg-fifth/[0.2] input-lg rounded-lg p-3"
              aria-label="Edit user name input"
            />
          ) : (
            <div className="flex items-center">
              <span className="text-3xl min-w-fit mr-3">{userName}</span>
              <button
                className="h-[20px]"
                onClick={handleClickEditName}
                aria-label="Edit user name button"
              >
                <Edit />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-4 gap-5 w-full">
          <h3 className="text-xl">Achievements</h3>
          <AchievementsBoxes>
            GENERATION: {user?.models?.length}, LIKES: 0, SALES: 0
          </AchievementsBoxes>
        </div>
        <div className="flex flex-col mt-20 gap-7 lg:flex-row">
          <SettingModal />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
