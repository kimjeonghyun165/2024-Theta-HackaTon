const surfaces = ["Smooth", "Rough"];

const Surface = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-small text-center">Surface</p>
      <div className="flex gap-4 justify-between">
        {surfaces.map((component, index) => (
          <div
            key={index}
            className="btn p-1 btn-ghost text-body-base rounded-full w-1/2 gap-2 height-normal:btn-sm"
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surface;
