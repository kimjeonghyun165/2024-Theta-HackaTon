import { Check } from "../../../assets/icons";
import { SimpleRange } from "../range/Range";

const Balloon = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-xl">Balloon</p>
      <div className="px-4">
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

export default Balloon;
