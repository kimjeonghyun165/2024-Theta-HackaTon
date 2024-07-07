import { Carousel } from "../../../components/home";
import { marketImgs } from "../../../constant/home";

const Section2 = () => {
  return (
    <section id="market-section" className="flex flex-col gap-12">
      <h1 className="italic">
        <p className="font-semibold text-6xl">Market</p>
        <p className="text-xl">Featured IMAGINATION</p>
      </h1>
      <div className="flex justify-around items-center">
        <Carousel images={marketImgs} />
      </div>
    </section>
  );
};

export default Section2;
