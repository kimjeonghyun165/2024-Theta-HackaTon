interface SwapIconButtonProps {
  swapOnIcon: React.FC;
  swapOffIcon: React.FC;
  bgColor: string;
  isSwapped: boolean;
  onSwap: () => void;
  tooltipOn?: string;
  tooltipOff?: string;
  tooltipPosition?: "left" | "right" | "top" | "bottom";
}

const SwapIconBtn: React.FC<SwapIconButtonProps> = ({
  swapOnIcon: SwapOnIcon,
  swapOffIcon: SwapOffIcon,
  bgColor,
  isSwapped,
  onSwap,
  tooltipOn,
  tooltipOff,
  tooltipPosition = "top",
}) => {
  const tooltipText = isSwapped ? tooltipOn : tooltipOff;
  const tooltipClass = tooltipText
    ? `tooltip font-normal tooltip-${tooltipPosition}`
    : "";

  return (
    <div className={`relative ${tooltipClass}`} data-tip={tooltipText}>
      <label
        className={`swap swap-rotate btn btn-circle border-none p-3 ${bgColor}`}
      >
        <input type="checkbox" checked={isSwapped} onChange={onSwap} />
        <div className="swap-off">
          <SwapOffIcon />
        </div>
        <div className="swap-on">
          <SwapOnIcon />
        </div>
      </label>
    </div>
  );
};

export default SwapIconBtn;
