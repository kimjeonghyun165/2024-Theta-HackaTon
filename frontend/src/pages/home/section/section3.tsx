import { useEffect, useRef, useState } from "react";
import Anvil2 from "../../../assets/anvil2";

const Section3 = () => {
  const anvilRef = useRef(null);
  const coverRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (anvilRef.current) {
      observer.observe(anvilRef.current);
    }

    return () => {
      if (anvilRef.current) {
        observer.unobserve(anvilRef.current);
      }
    };
    console.log(anvilRef);
  }, []);

  return (
    <section id="about-section" className="flex flex-col gap-12">
      <div className="flex w-full">
        <div className="z-10 flex flex-col w-3/4 gap-12 italic text-wrap">
          <h1 className="text-6xl font-semibold">ABOUT</h1>
          <h2 className="mt-8 text-xl">
            Welcome to ANVIL AI, the cutting-edge tool for visionaries in the
            content creation industry.As the futuristic blacksmith of the
            digital age, ANVIL AI forges your ideas into reality. Simply input
            your prompt, and ANVIL will craft the 3D model you've envisioned
            with precision and artistry.
          </h2>
          <h2 className="text-xl">
            Whether you're a game developer, filmmaker, or digital artist, ANVIL
            AI is designed to empower you, transforming your concepts into
            high-quality 3D models effortlessly. Embrace the future of content
            creation with ANVIL AI - where your imagination meets our
            craftsmanship.
          </h2>
        </div>
        <div>
          <div
            ref={anvilRef}
            className="absolute right-0 z-0 w-5/6 mt-20 md:w-2/3 md:ml-6 md:mt-0"
          >
            <Anvil2 />
          </div>
          <div
            ref={coverRef}
            style={{
              transition: "transform 3s",
              transform: isVisible ? "translateX(-1000px)" : "translateX(0)",
            }}
            className="absolute right-0 z-0 w-4/6 mt-20 bg-black h-[700px] md:w-2/3 md:ml-6 md:mt-0"
          />
        </div>
      </div>
      <div className="z-10 flex gap-6">
        <div className="text-white border-2 border-white rounded-full btn btn-sm btn-ghost lg:btn-lg">
          Text-to-3D AI Generation
        </div>
        <div className="text-white border-2 border-white rounded-full btn btn-sm btn-ghost lg:btn-lg">
          Image-to-3D AI Generation
        </div>
        <div className="text-white border-2 border-white rounded-full btn btn-sm btn-ghost lg:btn-lg">
          Easy Customizing
        </div>
      </div>
    </section>
  );
};

export default Section3;