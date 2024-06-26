import Anvil from "../../../assets/anvil";

const Section1 = () => {
  return (
    <section className="flex flex-col gap-24 h-full">
      <div className="flex justify-around items-center">
        <div className="w-full">
          <h1 className="flex flex-col font-bold gap-6 pl-12">
            <p className="text-4xl md:text-5xl lg:text-6xl tracking-[.17em]">
              SMITH ALL
              <br />
              <p className="tracking-tighter">IMAGINATION</p>
            </p>
            <p className="text-lg md:text-xl lg:text-2xl">
              THE BEST CUSTOMIZING 3D GENERATIVE AI
            </p>
          </h1>
        </div>
        <div className="w-full hidden md:block">
          <Anvil />
        </div>
      </div>
      <div className="flex justify-center">
        <label className="input input-bordered input-lg input-ghost flex items-center justify-around max-w-xs border-2 border-white rounded-full w-full focus-within:outline-white px-0">
          <input
            type="text"
            placeholder="Key In Prompt:"
            className="grow focus:outline-none rounded-full pl-4"
          />
          <div className="btn btn-ghost btn-lg rounded-full text-white focus:none px-4 mr-2">
            Generate
          </div>
        </label>
      </div>
    </section>
  );
};

export default Section1;
