interface IconButtonProps {
  icon: React.FC;
  bgColor: string;
  onClick?: () => void;
  size?: string;
  shape?: string;
}

const IconBtn: React.FC<IconButtonProps> = ({
  icon: IconComponent,
  bgColor,
  onClick,
  size = "p-4",
  shape = "btn-circle",
}) => (
  <button
    className={`btn ${shape} ${size} border-none ${bgColor}`}
    onClick={onClick}
  >
    <IconComponent />
  </button>
);

export default IconBtn;
