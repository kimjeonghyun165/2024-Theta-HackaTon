import { useState } from "react";
import { Model } from "../../interfaces/model.interface";
import { ModalKey, useModalStore } from "../../store/useStore";
import LoadMoreButton from "./common/LoadMoreButton";
import SearchBar from "./common/SearchBar";
import DetailModal from "../common/modal/modelModals/DetailModal";
import useModelSearch from "../../hooks/useModelSearch";
import Anvil3 from "../../assets/Anvil3";

const UserOwnModel = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const filterModelDto = { limit: 8 };
  const openModal = useModalStore((state) => state.openModal);

  const {
    searchTerm,
    filteredModels,
    handleSearchChange,
    handleSortChange,
    handleScroll,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useModelSearch(filterModelDto);

  const handleModelClick = (model: Model) => {
    setSelectedModel(model);
    openModal(ModalKey.DETAIL_MODAL);
  };

  return (
    <section className="bg-[#D0D0D0]/[.07] rounded-3xl px-14 pt-14 pb-7">
      <div className="flex w-full items-center gap-10 text-2xl mb-10">
        <input type="checkbox" className="checkbox" />
        <div className="w-full flex justify-between">
          <SearchBar
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder={"Search Models:"}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
      <div
        className="myPage-scrollbar"
        onScroll={handleScroll}
        role="list"
        aria-label="Model list"
      >
        {filteredModels && filteredModels.length > 0 ? (
          <div className="min-h-[500px] max-h-[500px] flex justify-center">
            <div className="grid grid-cols-4 gap-8">
              {filteredModels.map((model: Model) => (
                <button
                  key={model._id}
                  className={`rounded-3xl flex flex-col justify-between items-center mx-auto`}
                  onClick={() => handleModelClick(model)}
                >
                  <img src={model.preview} className="rounded-3xl" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-[500px] max-h-[500px] flex items-center justify-center">
            <div className="flex flex-col justify-center items-center text-center text-white text-lg gap-2">
              <div className="w-2/3">
                <Anvil3 />
              </div>
              <p>There’s nothing here yet</p>
              <p>Strike the anvil and forge your imagination</p>
            </div>
          </div>
        )}
        {filteredModels && filteredModels.length > 8 && (
          <LoadMoreButton
            isLoading={isFetchingNextPage}
            hasNextPage={!!hasNextPage}
            onClick={() => fetchNextPage()}
            error={error ? `${error}` : null}
          />
        )}
      </div>
      {selectedModel && <DetailModal model={selectedModel} />}
    </section>
  );
};

export default UserOwnModel;
