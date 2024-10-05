import React from "react";
import Kocca from "../../../assets/alliances/Kocca";
import GameHub from "../../../assets/alliances/GameHub";
import CodeNameLogo from "../../../assets/alliances/CodeNameLogo";
import GyeonggiGameHSLogo from "../../../assets/alliances/GyeonggiGameHSLogo";

const HomeSection5: React.FC = () => {
  return (
    <section className="flex flex-col">
      <div className="text-center">
        <h1 className="text-[80px] font-semibold">Alliances</h1>
      </div>
      <div className="flex justify-center w-full mx-auto mt-20">
        <div
          className="grid grid-cols-4 items-start justify-center"
          data-aos="fade-out"
          data-aos-duration="1000"
          data-aos-easing="easeOutCubic"
        >
          <Kocca />
          <GameHub />
          <GyeonggiGameHSLogo />
          <CodeNameLogo />
        </div>
      </div>
    </section>
  );
};

export default HomeSection5;
