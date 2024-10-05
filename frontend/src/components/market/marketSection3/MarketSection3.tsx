import MultipleSlider from "./MultipleSlider";

const MarketSection3 = () => {
  return (
    <div className=" max-w-[1256px] flex flex-col gap-32">
      <div>
        <MultipleSlider title={"HOT"} cards={[]} />
      </div>
      <div>
        <MultipleSlider title={"Best Seller"} cards={[]} />
      </div>
      <div>
        <MultipleSlider title={"Hot Deals"} cards={[]} />
      </div>
    </div>
  );
};

export default MarketSection3;
