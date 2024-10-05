import {
  Mirror_1,
  Mirror_2,
  Mirror_3,
} from "../../../assets/generate/customization/Mirror";

const mirrors = [Mirror_1, Mirror_2, Mirror_3];

const Mirror = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-small text-center">Mirror</p>
      <div className="flex justify-between gap-4">
        {mirrors.map((Component, index) => (
          <div
            key={index}
            className="p-3 btn btn-ghost btn-circle height-normal:btn-sm height-normal:p-1"
          >
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mirror;
