import {
  Body_1,
  Body_2,
  Dumbbell_1,
  Dumbbell_2,
} from "../../../assets/customization";
import { Range } from "../range/Range";

const Shape = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Shape</p>
      <div className="flex items-center justify-around gap-4 px-4">
        <div className="w-[10%]">
          <Body_1 />
        </div>
        <Range min={0} max={120} step={20} />
        <div className="w-[10%]">
          <Body_2 />
        </div>
      </div>
      <div className="flex items-center justify-around gap-4 px-4">
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
