import React from "react";

interface SwapIconButtonProps {
  swapOnIcon: React.FC;
  swapOffIcon: React.FC;
  bgColor: string;
}

const SwapIconBtn: React.FC<SwapIconButtonProps> = ({
  swapOnIcon: SwapOnIcon,
  swapOffIcon: SwapOffIcon,
  bgColor,
}) => (
  <label
    className={`btn btn-circle swap swap-rotate border-none p-3 ${bgColor}`}
  >
    <input type="checkbox" />
    <div className="swap-off">
      <SwapOffIcon />
    </div>
    <div className="swap-on">
      <SwapOnIcon />
    </div>
  </label>
);

export default SwapIconBtn;
