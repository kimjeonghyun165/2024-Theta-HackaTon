import React from "react";

interface AvatarProps {
  img: string | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ img }) => {
  return (
    <div className="avatar">
      <div className="rounded-full">
        <img src={img} alt="Profile" />
      </div>
    </div>
  );
};

export default Avatar;
