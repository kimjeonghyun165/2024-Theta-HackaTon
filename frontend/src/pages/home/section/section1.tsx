import Anvil from "../../../assets/anvil";

const Section1 = () => {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex justify-around items-center">
        <div className="w-full">
          <h1 className="flex flex-col text-center font-bold gap-6">
            <p className="text-4xl md:text-5xl lg:text-6xl">Only 57 Seconds!</p>
            <p className="text-3xl md:text-4xl lg:text-5xl">
              FASTEST & EASIEST
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl">
              3D Model Generative AI
            </p>
          </h1>
        </div>
        <div className="w-full hidden md:block">
          <Anvil />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="input input-bordered flex items-center  max-w-xs border-2 border-white rounded-full w-full focus-within:outline-white px-0">
          <input
            type="text"
            placeholder="Key In Prompt:"
            className="grow focus:outline-none rounded-full pl-4"
          />
          <div className="btn btn-ghost rounded-full text-white focus:none">
            Generate
          </div>
        </label>
      </div>
    </section>
  );
};

export default Section1;
