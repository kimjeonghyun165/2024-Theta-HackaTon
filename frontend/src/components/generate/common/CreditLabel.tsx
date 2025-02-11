import { Plus, Star } from "../../../assets/icons";

const CreditLabel = ({ credits }: { credits: number }) => {
  return (
    <label className="bg-fifth/[.13] flex rounded-2xl">
      <div className="flex items-center gap-2 text-sm px-4">
        <Star />
        <p className="font-semibold italic">{credits}</p>
        <p>credits</p>
      </div>
      <div className="btn bg-fifth/[.13] rounded-2xl">
        <Plus />
      </div>
    </label>
  );
};

export default CreditLabel;
