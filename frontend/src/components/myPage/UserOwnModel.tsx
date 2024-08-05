import React, { useState } from "react";
import { Check, Search } from "../../assets/icons";
import ModelBox from "./userOwnModel/ModelBox";
import { useFetchModels } from "../../hooks/tanstackQuery/useModelApi";
import { Model } from "../../store/useModelStore";

const UserOwnModel = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isError } = useFetchModels(4);
  const [isChecked, setIsChecked] = useState(false);
  if (isError) {
    console.error(error);
  }
  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && hasNextPage) {
      fetchNextPage()
    }
  };

  return (
    <section className="bg-[#D0D0D0]/[.07] rounded-[30px] px-20 py-20">
      <div className="flex items-center gap-10 text-2xl xl:px-14">
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
            <div
              className="w-[25px] h-[23px] sm:hidden xl:block"
              aria-hidden="true"
            >
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
        <button className="flex-1 text-center text-white" aria-label="Recent">
          Recent ▼
        </button>
      </div>
      <div
        className="max-h-[500px] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-y-10 mt-10 myPage-scrollbar xl:gap-x-5"
        onScroll={handleScroll}
        role="list"
        aria-label="Model list"
      >
        {data?.pages.map((page) =>
          page.map((model: Model, index: number) => (
            <ModelBox key={index} model={model} role="listitem">
              <img src={model.preview} />
            </ModelBox>
          )
          ))}
        {/* {isFetchingNextPage ? (
          <span className="w-full col-span-1 text-2xl text-center sm:col-span-2 2xl:col-span-4">
            Loading...
          </span>
        ) :  */}
        {hasNextPage ?
          null
          : <span className="w-full col-span-1 text-2xl text-center sm:col-span-2 2xl:col-span-4">
            No More Models
          </span>
        }
      </div>
    </section>
  );
};

export default UserOwnModel;
