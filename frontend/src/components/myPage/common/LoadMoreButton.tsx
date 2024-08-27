import React from "react";

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
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (!hasNextPage) {
    return <div className="text-center mt-4">No More Models</div>;
  }

  return (
    <div className="w-full text-center mt-4">
      <button className="btn btn-ghost" onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
