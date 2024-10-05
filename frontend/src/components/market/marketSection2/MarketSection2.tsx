import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import {
  LeftSlideArrow,
  RightSlideArrow,
} from "../../../assets/icons/SlideArrow";
import { useCallback, useRef } from "react";
import "./style.css";

const MarketSection2 = () => {
  const slickRef = useRef<any>(null);

  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, []);

  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    arrows: false,
  };

  return (
    <div className="slider-container max-w-[1256px] relative">
      <div className="text-center text-5xl italic">Collections</div>
      <Slider {...settings} ref={slickRef} className="mt-24 px-24">
        <Card />
        <Card />
        <Card />
        <Card />
      </Slider>
      <div className="absolute top-[64%] transform -translate-y-1/2 w-full flex justify-between px-4">
        <div className="cursor-pointer w-8" onClick={previous}>
          <LeftSlideArrow />
        </div>
        <div className="cursor-pointer w-8" onClick={next}>
          <RightSlideArrow />
        </div>
      </div>
    </div>
  );
};

export default MarketSection2;
