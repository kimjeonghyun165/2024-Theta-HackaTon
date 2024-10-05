import { Body_1, Body_2 } from "../../../assets/generate/customization/Body";
import {
  Dumbbell_1,
  Dumbbell_2,
} from "../../../assets/generate/customization/Dumbbell";
import { Range } from "../common/range/Range";

const Shape = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-small">Shape</p>
      <div className="flex items-center justify-around gap-4 px-4">
        <div className="w-[10%] height-small:w-[8%]">
          <Body_1 />
        </div>
        <Range min={0} max={120} step={20} />
        <div className="w-[10%] height-small:w-[8%]">
          <Body_2 />
        </div>
      </div>
      <div className="flex items-center justify-around mt-2 gap-4 px-4">
        <div className="w-[10%] height-small:w-[8%]">
          <Dumbbell_1 />
        </div>
        <Range min={0} max={120} step={20} />
        <div className="w-[10%] height-small:w-[8%]">
          <Dumbbell_2 />
        </div>
      </div>
    </div>
  );
};

export default Shape;
