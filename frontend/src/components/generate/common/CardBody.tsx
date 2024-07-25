import React from "react";

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`card-body p-0 flex justify-between rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
};

export default CardBody;
