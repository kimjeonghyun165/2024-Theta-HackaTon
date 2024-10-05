import Heart from "../../../assets/market/Heart";
import Avatar from "../../common/Avatar";

const Card = () => {
  return (
    <div className="rounded-3xl bg-[#777777]/[.2] flex justify-center m-12">
      <div className="flex relative">
        <img src="./1.png" />
        <div className="absolute rounded-3xl flex flex-col justify-between w-full h-full p-2 text-white transition-opacity duration-300 bg-black bg-opacity-5 opacity-0 hover:opacity-100">
          <div className=" px-4 w-full">
            <p className="italic font-bold">Art Name</p>
            <div className="flex items-center justify-around w-full h-full text-sm">
              <div className="flex gap-2 w-full">
                <Avatar img={"./1.png"} width={"w-5"} height={"h-5"} />
                <div className="">ArtistName</div>
              </div>
              <div className="flex items-center text-sm gap-2 h-8">
                <Heart />
                <span>1,202</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="btn w-1/3 text-xs btn-sm rounded-full bg-[#777777]/[.2] text-[#A1B0FF] bottom-0">
              $ 1,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
