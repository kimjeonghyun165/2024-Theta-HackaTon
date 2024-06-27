import Carousel from "../../../components/carousel/carousel";
import { marketImgs } from "../../../constant/home";

const Section2 = () => {
  return (
    <section className="flex flex-col gap-12">
      <h1 className="italic">
        <p className="font-semibold text-4xl md:text-5xl lg:text-6xl">Market</p>
        <p className="text-xs md:text-lg lg:text-xl">Featured IMAGINATION</p>
      </h1>
      <div className="flex justify-around items-center">
        <Carousel images={marketImgs} />
      </div>
    </section>
  );
};

export default Section2;
