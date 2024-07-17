interface LoadingProps {
  size?: "xs" | "sm" | "md" | "lg";
}

const Loading = ({ size = "xs" }: LoadingProps) => {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
};

export default Loading;
