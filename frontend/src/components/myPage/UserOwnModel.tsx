import { useState } from "react";
import { Model } from "../../interfaces/model.interface";
import { ModalKey, useModalStore } from "../../store/useStore";
import LoadMoreButton from "./common/LoadMoreButton";
import SearchBar from "./common/SearchBar";
import DetailModal from "../common/modal/modelModals/DetailModal";
import useModelSearch from "../../hooks/useModelSearch";

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
      <div className="flex w-full items-center gap-10 text-2xl">
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
        className="min-h-[500px] max-h-[500px] justify-center mt-10 myPage-scrollbar pr-0"
        onScroll={handleScroll}
        role="list"
        aria-label="Model list"
      >
        {filteredModels && filteredModels.length > 0 ? (
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
        ) : (
          <div className="text-center text-gray-500 text-lg">No Data</div>
        )}
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          hasNextPage={!!hasNextPage}
          onClick={() => fetchNextPage()}
          error={error ? `${error}` : null}
        />
      </div>
      {selectedModel && <DetailModal model={selectedModel} />}
    </section>
  );
};

export default UserOwnModel;
