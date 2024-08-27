import LowPoly from "../../../assets/generate/style/LowPoly";
import CardBody from "../common/CardBody";
import CreditInfo from "../common/CreditInfo";
import { Range } from "../common/range/Range";

interface LowPolyCardProps {
  rangeValue: number;
  handleRangeChange: (value: number) => void;
  handleGenerate: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const LowPolyCard: React.FC<LowPolyCardProps> = ({
  rangeValue,
  handleRangeChange,
  handleGenerate,
  isLoading,
  isDisabled,
}) => {
  return (
    <div className="relative w-full max-w-3xl pt-8 pr-0 text-white card">
      <div className="absolute left-0 flex justify-between -top-1">
        <div className="w-1/2 pr-6">
          <LowPoly />
        </div>
        <h2 className="pr-4 text-3xl font-extrabold">LOW POLY</h2>
      </div>
      <CardBody className="bg-[#A1B0FF]/[.17]">
        <div className="w-full pb-12 flex flex-col bg-[#A1B0FF]/[.07] rounded-3xl items-end">
          <div className="flex flex-col items-start w-1/2 gap-2 mt-3">
            <label className="block text-lg font-medium">Polygon Count</label>
            <div className="flex justify-between w-full pr-8 text-xs">
              <div>Low</div>
              <div>High</div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="flex justify-end h-1 bg-white">
              <div className="w-1/2 pr-10">
                <Range
                  min={0}
                  max={100}
                  step={50}
                  initialValue={rangeValue}
                  onChange={handleRangeChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 pr-0">
          <div>
            <ul className="text-sm list-disc">
              <li>Fast Generation</li>
              <li className="mt-1">
                Optimized Model For <br /> Game Development
              </li>
            </ul>
          </div>
          <CreditInfo
            credits={20}
            onClick={handleGenerate}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </div>
      </CardBody>
    </div>
  );
};

export default LowPolyCard;
