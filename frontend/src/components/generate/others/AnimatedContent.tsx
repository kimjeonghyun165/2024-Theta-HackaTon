import React from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedContent: React.FC<
  React.PropsWithChildren<{ isVisible: boolean }>
> = ({ isVisible, children }) => {
  const springProps = useSpring({
    transform: isVisible ? "translateY(0%)" : "translateY(100%)",
    opacity: isVisible ? 1 : 0,
    config: { tension: 250, friction: 25 },
  });

  return (
    <animated.div style={springProps} className="absolute w-full h-full">
      {children}
    </animated.div>
  );
};

export default AnimatedContent;
