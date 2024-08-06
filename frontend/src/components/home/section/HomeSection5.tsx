import React from "react";
import Alliance from "../../../assets/alliances/Alliance";
import Kocca from "../../../assets/alliances/Kocca";
import GameHub from "../../../assets/alliances/GameHub";
import CodeName from "../../../assets/alliances/CodeName";
import CodeNameLogo from "../../../assets/alliances/CodeNameLogo";

const HomeSection5: React.FC = () => {
  return (
    <section className="flex flex-col">
      <div className="text-center">
        <h1 className="text-[80px] font-semibold">Alliances</h1>
      </div>
      <div className="flex justify-center w-full mx-auto mt-20">
        <div className="flex flex-wrap items-start justify-center" data-aos="fade-out" data-aos-duration="1000" data-aos-easing="easeOutCubic">
          <div className="relative flex flex-col w-[500px] h-[500px] justify-center items-center md:w-[386px] md:h-[386px]" aria-label="Korea Creative Content Agency">
            <div className="absolute">
              <Alliance />
            </div>
            <div className="mb-8">
              <Kocca />
            </div>
          </div>
          <div className="relative flex flex-col w-[500px] h-[500px] justify-center items-center md:w-[386px] md:h-[386px]" aria-label="Global Game Hub Center">
            <div className="absolute">
              <Alliance />
            </div>
            <div className="flex flex-col items-center justify-center text-[35px] mb-12">
              <GameHub />
            </div>
          </div>
          <div className="relative flex flex-col w-[500px] h-[500px] justify-center items-center md:w-[386px] md:h-[386px]" aria-label="Global Game Hub Center">
            <div className="absolute">
              <Alliance />
            </div>
            <div className="flex flex-col items-center justify-center text-[35px] mb-16 gap-3">
              <CodeNameLogo />
              <CodeName />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection5;
