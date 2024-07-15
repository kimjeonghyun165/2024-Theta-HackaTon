import React, { useState } from "react";
import { Layout } from "../../components/myPage/layout";
import AchievementsBox from "../../components/myPage/achievementsBox";
import { Ex1 } from "../../assets/imgSelect";
import { Check } from "../../assets/icons";
import ModelBox from "../../components/myPage/modelBox";
import "../../components/myPage/scrollbarStyle.css"
import Edit from "../../assets/icons/edit";
import Search from "../../assets/icons/search";
import SettingButton from "../../components/myPage/settingButton";

const MyPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Layout>
      <section className="mx-auto w-4/5 bg-[#D0D0D0]/[.07] rounded-3xl flex flex-col">
        <div className="flex flex-col w-full h-full gap-20 pt-10 px-14">
          <section className="flex gap-14 h-[666px]">
            <div className="flex-1 border-2 rounded-[30px] relative" style={{ background: 'linear-gradient(135deg, rgba(36, 72, 98, 0.09) 0%, rgba(255, 255, 255, 0.27) 55.1%, rgba(255, 255, 255, 0.27) 63.6%, rgba(36, 72, 98, 0.3) 100%)' }}><Ex1 /><button className="w-[33px] h-[33px] absolute top-3 right-6"><Edit /></button></div>

            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-3">
                <h1 className="flex items-center gap-2 text-2xl">
                  <div className="w-[27px] h-[27px] rounded-md" style={{ borderRadius: '10px 0px 10px 13.5px', background: 'linear-gradient(135deg, rgba(36, 72, 98, 0.3) 0%, rgba(255, 255, 255, 0.9) 55.1%, rgba(255, 255, 255, 0.9) 63.6%, #244862 100%)' }} />
                  Platinum BlackSmith</h1>
                <h2 className="relative text-5xl">Macallan Craigellachie
                  <button className="absolute right-0 bottom-[50%]"><Edit /></button>
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl">Achievements</h3>
                <div className="flex gap-8">
                  <AchievementsBox>
                    <h4 className="text-[20px]">GENERATION</h4>
                    <h5 className="font-bold text-[64px]">55</h5>
                  </AchievementsBox>
                  <AchievementsBox>
                    <h4>LIKES</h4>
                    <h5 className="font-bold text-[64px]">101</h5>
                  </AchievementsBox>
                  <AchievementsBox>
                    <h4>SALES</h4>
                    <h5 className="font-bold text-[64px]">1K</h5>
                  </AchievementsBox>
                </div>
              </div>
              <div className="flex gap-7">
                <button className="bg-[#777]/[0.2] rounded-[30px] w-full py-7 text-2xl">
                  Management
                </button>
                <SettingButton>
                  Setting
                </SettingButton>
              </div>
            </div>
          </section>
          <section>
            <div className="flex gap-10 text-2xl">
              <button className="w-[51px] h-[51px] rounded-[5px] bg-[#777]/[0.2] flex justify-center items-center" onClick={() => setIsChecked((prev) => !prev)}>
                {isChecked ? <Check /> : null}
              </button>
              <div className="w-[704px] rounded-[30px] bg-[#777]/[0.2] placeholder:text-white placeholder:text-2xl flex items-center px-5 gap-3">
                <div className="w-[29px] h-[27px]">
                  <Search />
                </div>
                <span className="text-2xl text-white">Search:</span>
                <input type="text" className="text-white bg-transparent outline-none" />
              </div>
              <button className="ml-12 text-white right-20">
                Recent ▼
              </button>
            </div>
            <div className="max-h-[500px] overflow-y-scroll grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 mt-10 myPage-scrollbar">
              {new Array(12).fill(0).map((_, index) => {
                return (
                  <ModelBox key={index}>
                    <Ex1 />
                  </ModelBox>
                );
              })}
            </div>
          </section>
          <h1>내 페이지</h1>
        </div>
      </section>
    </Layout>
  );
};

export default MyPage;
