import DownArrow from "../../assets/imgSelect/dwonArrow";
import Ex1 from "../../assets/imgSelect/ex1";
import RefreshArrow from "../../assets/imgSelect/refreshArrow";
import CreditLabel from "./creditLabel";

export const ImgSelection = () => {
  return (
    <div className="flex h-full flex-col items-center justify-between py-10 px-16 max-w-2xl w-full bg-[#D0D0D0]/[.07] rounded-3xl">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex w-full justify-end">
          <CreditLabel />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <Ex1 />
            <Ex1 />
          </div>
          <div className="flex gap-4">
            <Ex1 />
            <Ex1 />
          </div>
        </div>
      </div>
      <div className="flex w-3/4 justify-around gap-1 items-center">
        <div className="btn btn-lg bg-fifth/[.13] rounded-2xl w-full">
          Select
        </div>
        <div className="flex flex-col gap-1">
          <div className="btn btn-sm btn-circle p-1 bg-fifth/[.13]">
            <DownArrow />
          </div>
          <div className="btn btn-sm btn-circle p-1 bg-fifth/[.13]">
            <RefreshArrow />
          </div>
        </div>
      </div>
    </div>
  );
};
