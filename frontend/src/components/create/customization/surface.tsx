const surfaces = ["Smooth", "Rough"];

const Surface = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-xl">Surface</p>
      <div className="flex gap-4 justify-between">
        {surfaces.map((component, index) => (
          <div
            key={index}
            className="btn btn-ghost px-1 text-lg rounded-full w-1/2 gap-2"
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surface;
