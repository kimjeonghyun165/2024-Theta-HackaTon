import Check from "../../../assets/customization/check";
import { SimpleRange } from "../range/range";

const stretchs = ["Wider", "Thicker", "Taller"];

const Stretch = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-xl">Stretch</p>
      <div className="px-4">
        <div className="flex gap-4 justify-between">
          {stretchs.map((component, index) => (
            <div
              key={index}
              className="btn btn-ghost text-lg rounded-full w-1/4"
            >
              {component}
            </div>
          ))}
        </div>
        <div className="flex justify-around items-center gap-4">
          <SimpleRange min={0} max={100} step={1} />
          <div className="btn btn-circle p-3 bg-fifth/[.13]">
            <Check />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stretch;
