import { Mirror_1, Mirror_2, Mirror_3 } from "../../../assets/customization";

const mirrors = [Mirror_1, Mirror_2, Mirror_3];

const Mirror = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold text-center">Mirror</p>
      <div className="flex justify-between gap-4">
        {mirrors.map((Component, index) => (
          <div key={index} className="p-1 btn btn-ghost btn-circle">
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mirror;
