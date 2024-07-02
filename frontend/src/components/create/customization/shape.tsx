import { Body_1, Body_2 } from "../../../assets/customization/body";
import { Dumbbell_1, Dumbbell_2 } from "../../../assets/customization/dumbbell";
import { Range } from "../range/range";

const Shape = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-xl">Shape</p>
      <div className="flex justify-around items-center gap-4 px-4">
        <div className="w-[10%]">
          <Body_1 />
        </div>
        <Range min={0} max={120} step={20} />
        <div className="w-[10%]">
          <Body_2 />
        </div>
      </div>
      <div className="flex justify-around items-center gap-4 px-4">
        <div className="w-[10%]">
          <Dumbbell_1 />
        </div>
        <Range min={0} max={120} step={20} />
        <div className="w-[10%]">
          <Dumbbell_2 />
        </div>
      </div>
    </div>
  );
};

export default Shape;
