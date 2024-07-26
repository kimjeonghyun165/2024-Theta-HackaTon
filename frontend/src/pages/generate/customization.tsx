import { RefreshArrow } from "../../assets/generate/imgSelect";
import {
  Balloon,
  CreditLabel,
  Mirror,
  Shape,
  Stretch,
  Surface,
} from "../../components/generate";

const Customization = ({ onPostBtnClick }: any) => {
  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl overflow-auto">
      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Shape />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Stretch />
        </div>
        <div className="flex justify-between gap-4 w-full">
          <Surface />
          <Mirror />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Balloon />
        </div>
      </div>
      <div className="flex w-3/4 justify-around gap-1 items-center mt-4">
        <div
          className="btn btn-lg bg-fifth/[.13] rounded-2xl w-full"
          onClick={onPostBtnClick}
        >
          Post
        </div>
        <div className="btn btn-sm btn-circle p-1 bg-fifth/[.13]">
          <RefreshArrow />
        </div>
      </div>
    </div>
  );
};

export default Customization;
