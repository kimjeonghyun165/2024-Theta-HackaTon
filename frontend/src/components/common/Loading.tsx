interface LoadingProps {
  size?: "xs" | "sm" | "md" | "lg";
  type?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
}

const Loading = ({ size = "xs", type = "spinner" }: LoadingProps) => {
  return <span className={`loading loading-${type} loading-${size}`}></span>;
};

export default Loading;
