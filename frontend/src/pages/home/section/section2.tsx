import { Carousel } from "../../../components/home";
import { marketImgs } from "../../../constant/home";

const Section2 = () => {
  return (
    <section id="market-section" className="z-10 flex flex-col gap-12 overflow-hidden">
      <h1 className="italic">
        <p className="text-6xl font-semibold">Market</p>
        <p className="text-xl">Featured IMAGINATION</p>
      </h1>
      <div className="flex items-center justify-around" data-aos="slide-left" data-aos-duration="1000">
        <Carousel images={marketImgs} />
      </div>
    </section>
  );
};

export default Section2;
