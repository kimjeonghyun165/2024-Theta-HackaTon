import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypingEffect = () => {
  const [text] = useTypewriter({
    words: ["Welcome to ANVIL AI", "THE BEST CUSTOMIZING 3D GENERATIVE AI"],
    loop: 1,
    delaySpeed: 2000,
    typeSpeed: 100,
    deleteSpeed: 50,
  });

  return (
    <>
      <p className="mt-4 text-lg lg:text-xl xl:text-2xl">{text}</p>
      {/* <Cursor /> */}
    </>
  );
};

export default TypingEffect;
