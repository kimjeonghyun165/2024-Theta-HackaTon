interface IconButtonProps {
  icon: React.FC;
  bgColor: string;
}

const IconBtn: React.FC<IconButtonProps> = ({
  icon: IconComponent,
  bgColor,
}) => (
  <div className={`btn btn-circle border-none p-4 ${bgColor}`}>
    <IconComponent />
  </div>
);

export default IconBtn;
