import LowPoly from "../../../assets/generate/style/LowPoly";
import { CardBody, CreditInfo, Range } from "../common";

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
    <div className="card relative pt-8 w-full max-w-3xl text-white pr-0">
      <div className="absolute left-0 -top-1 flex justify-between">
        <div className="w-1/2 pr-6">
          <LowPoly />
        </div>
        <h2 className="text-3xl pr-4 font-extrabold">LOW POLY</h2>
      </div>
      <CardBody className="bg-[#A1B0FF]/[.17]">
        <div className="w-full pb-12 flex flex-col bg-[#A1B0FF]/[.07] rounded-3xl items-end">
          <div className="w-1/2 mt-3 flex flex-col items-start gap-2">
            <label className="block text-lg font-medium">Polygon Count</label>
            <div className="flex w-full justify-between pr-8 text-xs">
              <div>Low</div>
              <div>High</div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="bg-white h-1 flex justify-end">
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
        <div className="px-8 py-4 flex justify-between items-center pr-0">
          <div>
            <ul className="list-disc text-sm">
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
