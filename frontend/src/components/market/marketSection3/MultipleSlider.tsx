import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  LeftSlideArrow,
  RightSlideArrow,
} from "../../../assets/icons/SlideArrow";
import { useCallback, useRef } from "react";
import Card from "./Card";

interface SliderProps {
  title: string;
  subtitle?: string;
  cards: JSX.Element[];
  sliderSettings?: any;
}

const MultipleSlider: React.FC<SliderProps> = ({
  title,
  subtitle,
  cards,
  sliderSettings,
}) => {
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

  const defaultSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    arrows: false,
    ...sliderSettings,
  };

  return (
    <div className="slider-container max-w-[1256px] relative">
      <div className="italic">
        <p className="text-5xl">{title}</p>
        {subtitle && <p className="text-2xl">{subtitle}</p>}
      </div>
      <SlickSlider {...defaultSettings} ref={slickRef} className="mt-16 px-24">
        {/* {cards.map((card, index) => (
          <div key={index}>{card}</div>
        ))} */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </SlickSlider>
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

export default MultipleSlider;
