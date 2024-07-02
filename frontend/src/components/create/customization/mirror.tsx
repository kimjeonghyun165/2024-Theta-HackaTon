import {
  Mirror_1,
  Mirror_2,
  Mirror_3,
} from "../../../assets/customization/mirror";

const mirrors = [Mirror_1, Mirror_2, Mirror_3];

const Mirror = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-xl text-center">Mirror</p>
      <div className="flex gap-4 justify-between">
        {mirrors.map((Component, index) => (
          <div key={index} className="btn btn-ghost btn-circle p-1">
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mirror;
