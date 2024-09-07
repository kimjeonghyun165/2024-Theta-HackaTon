import { Check } from "../../../assets/icons";
import { SimpleRange } from "../common/range/Range";

const Balloon = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-semibold height-normal:text-lg">Balloon</p>
      <div className="px-4">
        <div className="flex items-center justify-around gap-4">
          <SimpleRange min={0} max={100} step={1} />
          <div className="btn btn-circle p-3 bg-fifth/[.13] height-normal:btn-sm height-normal:p-2">
            <Check />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balloon;
