import { useState } from "react";
import { Edit } from "../../../../assets/icons";
import useModelSearch from "../../../../hooks/useModelSearch";
import { useUpdateUser } from "../../../../hooks/useUserApi";
import { Model } from "../../../../interfaces/model.interface";
import { UpdateUserDto } from "../../../../interfaces/user.interface";
import { ModalKey, useModalStore } from "../../../../store/useStore";
import ModalLayout from "../common/Layout";
import LoadMoreButton from "../../../myPage/common/LoadMoreButton";
import SearchBar from "../../../myPage/common/SearchBar";
import Anvil3 from "../../../../assets/Anvil3";

const EditProfileModal = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const { mutate: updateUser } = useUpdateUser();
  const filterModelDto = { limit: 4 };
  const { modals, openModal } = useModalStore((state) => ({
    modals: state.modals,
    openModal: state.openModal,
  }));

  const {
    searchTerm,
    filteredModels,
    handleSearchChange,
    handleSortChange,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useModelSearch(filterModelDto);

  const handleModelClick = () => {
    if (selectedModel) {
      const updateUserDto: UpdateUserDto = {
        profileImg: selectedModel.preview,
      };
      updateUser(updateUserDto);
      window.location.replace("/mypage");
    }
  };

  return (
    <>
      <button
        className="btn btn-circle btn-ghost p-3 z-10"
        onClick={() => openModal(ModalKey.EDIT_PROFILE_MODAL)}
      >
        <Edit />
      </button>

      <ModalLayout
        isVisible={modals.editProfileModal}
        modalName={ModalKey.EDIT_PROFILE_MODAL}
        className={"min-w-[950px]"}
      >
        <div className="w-full flex flex-col justify-between">
          <div className="flex items-center justify-between text-2xl font-bold text-second">
            <div>PROFILE ASSET SELECTION</div>
            <div
              className="btn btn-ghost rounded-full text-second font-bold text-xl"
              onClick={handleModelClick}
            >
              Update
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <SearchBar
              placeholder="Search Models Title:"
              onChange={handleSearchChange}
              value={searchTerm}
              onSortChange={handleSortChange}
            />
          </div>
          <div className="">
            {filteredModels && filteredModels.length > 0 ? (
              <div className="max-h-[300px] min-h-[300px] w-full justify-center overflow-scroll mt-10">
                <div className="grid grid-cols-4 gap-8">
                  {filteredModels.map((model: Model) => (
                    <button
                      key={model._id}
                      className={`rounded-3xl flex flex-col justify-between items-center mx-auto ${
                        selectedModel?._id === model._id
                          ? "border-4 border-blue-500"
                          : "bg-[#777777]/[0.2]"
                      }`}
                      onClick={() => setSelectedModel(model)}
                    >
                      <img
                        src={model.preview}
                        className="rounded-3xl"
                        alt="model preview"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-h-[300px] min-h-[300px] flex items-center justify-center">
                <div className="flex flex-col justify-center items-center text-center text-white text-lg gap-2">
                  <div className="w-2/5">
                    <Anvil3 />
                  </div>
                  <p>There’s nothing here yet</p>
                  <p>Strike the anvil and forge your imagination</p>
                </div>
              </div>
            )}
            {filteredModels && filteredModels.length > 4 && (
              <LoadMoreButton
                isLoading={isFetchingNextPage}
                hasNextPage={!!hasNextPage}
                onClick={() => fetchNextPage()}
                error={error ? `${error}` : null}
              />
            )}
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default EditProfileModal;
