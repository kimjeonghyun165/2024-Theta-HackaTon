import React from "react";
import Loading from "../../common/Loading";

interface LoadMoreProps {
  isLoading: boolean;
  hasNextPage: boolean;
  onClick: () => void;
  error?: string | null;
}

const LoadMoreButton: React.FC<LoadMoreProps> = ({
  isLoading,
  hasNextPage,
  onClick,
  error,
}) => {
  if (error) {
    return <div className="mt-4 text-center text-red-500">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center">
        <Loading type="dots" />
      </div>
    );
  }

  if (!hasNextPage) {
    return <div className="text-center mt-4"></div>;
  }

  return (
    <div className="w-full text-center mt-4">
      <button className="btn btn-ghost" onClick={onClick}>
        Load More +
      </button>
    </div>
  );
};

export default LoadMoreButton;
