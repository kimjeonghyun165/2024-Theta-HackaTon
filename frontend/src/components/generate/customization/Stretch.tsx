import { Check } from "../../../assets/icons";
import { SimpleRange } from "../common/range/Range";

const stretchs = ["Wider", "Thicker", "Taller"];

const Stretch = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-semibold height-normal:text-lg">Stretch</p>
      <div className="px-4">
        <div className="flex justify-between gap-4">
          {stretchs.map((component, index) => (
            <div
              key={index}
              className="w-1/4 text-base rounded-full btn btn-ghost height-normal:btn-sm"
            >
              {component}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-around gap-4 ">
          <SimpleRange min={0} max={100} step={1} />
          <div className="btn btn-circle p-3 bg-fifth/[.13] height-normal:btn-sm height-normal:p-2">
            <Check />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stretch;
