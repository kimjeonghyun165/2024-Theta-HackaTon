import { useCallback, useEffect, useState } from "react";
import { useModelStore } from "../../store/useModelStore";
import { Check } from "../../assets/icons";
import Search from "../../assets/icons/search";
import ModelBox from "./userOwnModel/ModelBox";
import { Ex1 } from "../../assets/generate/imgSelect";

const UserOwnModel = () => {
  const { models, fetchModels } = useModelStore((state) => ({
    models: state.models,
    fetchModels: state.fetchModels,
  }));
  const [isChecked, setIsChecked] = useState(false);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const bottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;
      if (bottom) {
        fetchModels(models.length, 8); // 스크롤이 끝까지 내려가면 추가 데이터 8개 불러오기
      }
    },
    [fetchModels, models.length]
  );

  useEffect(() => {
    fetchModels(0, 8); // 초기 데이터 8개 불러오기
  }, [fetchModels]);
  return (
    <section className="bg-[#D0D0D0]/[.07] rounded-[30px] px-20 py-20">
      <div className="flex items-center gap-10 text-2xl px-14">
        <button
          className="w-[51px] h-[51px] rounded-[5px] bg-[#777]/[0.2] flex justify-center items-center"
          onClick={() => setIsChecked((prev) => !prev)}
          aria-label="Toggle check"
        >
          {isChecked ? <Check /> : <div className="w-[51px]" />}
        </button>
        <div className="w-[704px] h-[43px] rounded-[30px] bg-[#777]/[0.2] placeholder:text-white placeholder:text-2xl flex items-center px-5">
          <label
            className="flex gap-3 text-xl text-white"
            htmlFor="search-input"
          >
            <div className="w-[25px] h-[23px]" aria-hidden="true">
              <Search />
            </div>
            Search:
          </label>
          <input
            type="text"
            id="search-input"
            className="h-full text-white bg-transparent outline-none"
            aria-label="Search"
          />
        </div>
        <button className="flex-1 text-right text-white" aria-label="Recent">
          Recent ▼
        </button>
      </div>
      <div
        className="max-h-[500px] overflow-y-scroll grid grid-cols-2 2xl:grid-cols-4 gap-y-10 mt-10 myPage-scrollbar gap-x-8"
        onScroll={handleScroll}
        role="list"
        aria-label="Model list"
      >
        {models.map((model, index) => (
          <ModelBox key={index} model={model} role="listitem">
            <Ex1 aria-hidden="true" />
          </ModelBox>
        ))}
      </div>
    </section>
  );
};

export default UserOwnModel;
