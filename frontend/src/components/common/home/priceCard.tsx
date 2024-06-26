import "./priceCard.css";

interface PriceCardProps {
  index: number;
  name: string;
  credits: string;
  license: string;
  price?: string;
  button: string;
  details?: string[];
}

const PriceCard: React.FC<PriceCardProps> = ({
  index,
  name,
  credits,
  license,
  price,
  button,
  details,
}) => {
  const gradientClass = index % 2 === 0 ? "bg-gradient-v1" : "bg-gradient-v2";

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div
        className={`${gradientClass} h-full pb-6 rounded-none px-4 flex flex-col justify-between w-full sm:w-52`}
      >
        <div className="py-12 h-auto">
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          <p className="text-lg text-white font-semibold mt-2">{credits}</p>
          <p className="text-lg text-white mt-2 font-extralight">{license}</p>
          {price && (
            <p className="text-lg text-white font-bold mt-4">{price}</p>
          )}
          {details && (
            <ul className="text-white mt-2 font-extralight">
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="btn bg-fourth text-lg rounded-xl text-white mt-4 w-full">
        {button}
      </div>
    </div>
  );
};

export default PriceCard;
