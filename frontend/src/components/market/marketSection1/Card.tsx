import Heart from "../../../assets/market/Heart";
import Avatar from "../../common/Avatar";
import "./style.css";

interface CardProps {
  imageSrc: string;
  title: string;
  artistName: string;
  artistProfile: string;
  price: number;
  description: string;
  likes: number;
  onPurchaseClick?: () => void;
}

const Card = ({
  imageSrc,
  title,
  artistName,
  artistProfile,
  price,
  description,
  likes,
}: CardProps) => {
  return (
    <div className="flex h-full w-full pr-12">
      <div className="w-1/2 flex justify-center">
        <img src={imageSrc} />
      </div>
      <div className="flex flex-col w-1/2 pr-12 justify-around gap-10">
        <div className="flex flex-col gap-12">
          <span className="text-4xl 2xl:text-5xl">{title}</span>
          <div className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-4">
              <Avatar img={artistProfile} />
              <span>{artistName}</span>
            </div>
            <span className="text-[#A1B0FF]">${price}</span>
          </div>
          <p className="italic text-lg">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 h-10">
            <Heart />
            <span>{likes}</span>
          </div>
          <button className="px-10 py-4 rounded-xl bg-eight text-second">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
