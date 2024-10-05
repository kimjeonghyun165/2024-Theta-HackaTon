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
    <div className="flex flex-col items-center justify-center p-6 md:w-[250px]">
      <div
        className={`${gradientClass} h-full pb-6 rounded-none px-4 flex flex-col justify-between w-52`}
      >
        <div className="h-auto py-12 text-wrap">
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <span>
            <h4 className="mt-2 text-lg font-semibold text-white">{credits}</h4>
            <h4 className="mt-2 text-lg text-white font-extralight">
              {license}
            </h4>
            {price && (
              <h4 className="mt-4 text-lg font-bold text-white">{price}</h4>
            )}
            {details && (
              <ul className="mt-2 text-white font-extralight">
                {details.map((detail, index) => (
                  <li key={index}>
                    <h5>{detail}</h5>
                  </li>
                ))}
              </ul>
            )}
          </span>
        </div>
      </div>
      <div
        className="w-full mt-4 text-lg text-white btn bg-fourth rounded-xl"
        aria-label={button}
      >
        {button}
      </div>
    </div>
  );
};

export default PriceCard;
