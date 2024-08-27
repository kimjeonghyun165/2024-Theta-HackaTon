import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

type Direction = "left" | "right";

interface AnimatedContentProps {
  isVisible: boolean;
  direction?: Direction;
}

const AnimatedContent: React.FC<
  React.PropsWithChildren<AnimatedContentProps>
> = ({ isVisible, direction = "right", children }) => {
  const [render, setRender] = useState(isVisible);

  const springProps = useSpring({
    transform: isVisible
      ? "translateX(0%)"
      : direction === "left"
      ? "translateX(-100%)"
      : "translateX(100%)",
    opacity: isVisible ? 1 : 0,
    config: { tension: 250, friction: 25 },
    onRest: () => !isVisible && setRender(false),
  });

  useEffect(() => {
    if (isVisible) setRender(true);
  }, [isVisible]);

  if (!render) return null; // 렌더링을 중단

  return (
    <animated.div
      style={springProps}
      className="absolute w-full h-full flex flex-col justify-center"
    >
      {children}
    </animated.div>
  );
};

export default AnimatedContent;
