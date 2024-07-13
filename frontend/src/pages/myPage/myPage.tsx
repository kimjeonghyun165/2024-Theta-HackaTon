import React, { useState } from "react";
import Web3Info from "../../web3/nft";
import { Layout } from "../../components/myPage/layout";
import AchievementsBox from "../../components/myPage/achievementsBox";
import { Ex1 } from "../../assets/imgSelect";
import { Check } from "../../assets/icons";
import ModelBox from "../../components/myPage/modelBox";
import "../../components/myPage/scrollbarStyle.css"
const MyPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Layout>
      <section className="mx-auto w-4/5 bg-[#D0D0D0]/[.07] rounded-3xl flex flex-col">
        <div className="w-full h-full pt-10 px-14 flex flex-col gap-20">
          <section className="flex gap-14 h-[666px]">
            <div className="flex-1 border-2"><Ex1 /></div>
            <div className="flex-1 border-2 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl">Platinum BlackSmith</h1>
                <h2 className="text-5xl">Macallan Craigellachie</h2>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl">Achievements</h3>
                <div className="flex gap-8">
                  <AchievementsBox>
                    <h4 className="text-[20px]">
                      GENERATION
                    </h4>
                    <h5 className="font-bold text-[64px]">
                      55
                    </h5>
                  </AchievementsBox>
                  <AchievementsBox>
                    <h4>
                      LIKES
                    </h4>
                    <h5 className="font-bold text-[64px]">
                      101
                    </h5>
                  </AchievementsBox>
                  <AchievementsBox>
                    <h4>
                      SALES
                    </h4>
                    <h5 className="font-bold text-[64px]">
                      1K
                    </h5>
                  </AchievementsBox>
                </div>

              </div>
              <div className="flex gap-7">
                <button className="bg-[#777]/[0.2] rounded-[30px] w-full py-7 text-2xl">Management</button>
                <button className="bg-[#777]/[0.2] rounded-[30px] w-full py-7 text-2xl">Setting</button>
              </div>
            </div>
          </section>
          <section>
            <div className="flex text-2xl">
              <button className="w-[51px] h-[51px] rounded-[5px] bg-[#777]/[0.2] flex justify-center items-center" onClick={() => setIsChecked((prev) => !prev)}>
                {isChecked ? <Check /> : null}
              </button>
              <input type="text" className="w-[704px] rounded-[30px] bg-[#777]/[0.2] placeholder:text-white placeholder:text-2xl" placeholder="Search" />
              <button>
                Recent
              </button>
            </div>
            <div className="max-h-[500px] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 mt-10 myPage-scrollbar">
              {new Array(12).fill(0).map((_, index) => {
                return <ModelBox key={index}><Ex1 /></ModelBox>
              })}
            </div>
          </section>
          <h1>내 페이지</h1>
          <div>
            <Web3Info />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyPage;
