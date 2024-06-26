import Anvil2 from "../../../assets/anvil2";

const Section3 = () => {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex w-full">
        <h1 className="italic text-wrap w-3/4 flex flex-col gap-12 z-10">
          <p className="font-semibold text-4xl md:text-5xl lg:text-6xl">
            ABOUT
          </p>
          <p className="text-xs md:text-lg lg:text-xl mt-8">
            Welcome to ANVIL AI, the cutting-edge tool for visionaries in the
            content creation industry.As the futuristic blacksmith of the
            digital age, ANVIL AI forges your ideas into reality. Simply input
            your prompt, and ANVIL will craft the 3D model you've envisioned
            with precision and artistry.
          </p>
          <p className="text-xs md:text-lg lg:text-xl">
            Whether you're a game developer, filmmaker, or digital artist, ANVIL
            AI is designed to empower you, transforming your concepts into
            high-quality 3D models effortlessly. Embrace the future of content
            creation with ANVIL AI - where your imagination meets our
            craftsmanship.
          </p>
        </h1>
        <div>
          <div className="absolute w-5/6 right-0 z-0 md:w-2/3 md:ml-6 mt-20 md:mt-0">
            <Anvil2 />
          </div>
        </div>
      </div>
      <div className="grid md:flex gap-6 z-10">
        <div className="btn btn-sm btn-ghost border-2 border-white rounded-full text-white lg:btn-lg">
          Text-to-3D AI Generation
        </div>
        <div className="btn btn-sm btn-ghost border-2 border-white rounded-full text-white lg:btn-lg">
          Image-to-3D AI Generation
        </div>
        <div className="btn btn-sm btn-ghost border-2 border-white rounded-full text-white lg:btn-lg">
          Easy Customizing
        </div>
      </div>
    </section>
  );
};

export default Section3;
