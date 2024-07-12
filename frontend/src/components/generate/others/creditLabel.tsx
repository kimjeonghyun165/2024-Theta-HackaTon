import Plus from "../../../assets/icons/plus";
import Star from "../../../assets/icons/star";

const CreditLabel = () => (
  <label className="bg-fifth/[.13] flex rounded-2xl">
    <div className="flex items-center gap-2 text-sm px-4">
      <Star />
      <p className="font-semibold italic">1,500</p>
      <p>credits</p>
    </div>
    <div className="btn bg-fifth/[.13] rounded-2xl">
      <Plus />
    </div>
  </label>
);

export default CreditLabel;
