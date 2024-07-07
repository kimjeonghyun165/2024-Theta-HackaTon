import Anvil from "../../../assets/anvil";
import TypingEffect from "../../../components/home/typingEffect";

const Section1 = () => {
  return (
    <section className="flex flex-col gap-24 h-full">
      <div className="flex justify-around items-center">
        <div className="w-full">
          <h1 className="flex flex-col font-bold gap-6 ml-6 2xl:ml-12 md:pl-16">
            <p className="text-4xl lg:text-5xl xl:text-6xl tracking-[.3em]">
              SMITH ALL
              <br />
              <p className="mt-4 tracking-[.05em]">IMAGINATION</p>
            </p>
            <TypingEffect />
          </h1>
        </div>
        <div className="w-full">
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
          <a
            className="btn btn-ghost btn-lg rounded-full text-white focus:none px-4 mr-2"
            href="/model/generate"
          >
            Generate
          </a>
        </label>
      </div>
    </section>
  );
};

export default Section1;
