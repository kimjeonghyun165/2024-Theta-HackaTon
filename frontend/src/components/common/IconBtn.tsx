import Loading from "./Loading";

interface IconButtonProps {
  icon: React.FC;
  isLoading?: boolean; // 로딩 상태
  className?: string;
  onClick?: () => void;
  tooltip?: string;
  tooltipPosition?: "left" | "right" | "top" | "bottom";
  disabled?: boolean;
}

const IconBtn: React.FC<IconButtonProps> = ({
  icon: IconComponent,
  isLoading = false,
  className = "",
  onClick,
  tooltip,
  tooltipPosition = "top",
  disabled = false,
}) => {
  const tooltipClass = tooltip ? `tooltip  tooltip-${tooltipPosition}` : "";

  return (
    <div className={tooltipClass} data-tip={tooltip}>
      <button
        className={`btn border-none ${className}`}
        onClick={onClick}
        disabled={disabled || isLoading} // 로딩 중에도 비활성화
      >
        {isLoading ? <Loading size="xs" /> : <IconComponent />}
      </button>
    </div>
  );
};

export default IconBtn;
