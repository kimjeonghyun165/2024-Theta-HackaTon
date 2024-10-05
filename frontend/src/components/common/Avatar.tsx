import React from "react";

interface AvatarProps {
  img: string | undefined;
  width?: string;
  height?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  img,
  width = "w-12",
  height = "h-12",
}) => {
  return (
    <div className="avatar relative">
      <div className={`rounded-full bg-white relative ${width}`}>
        <img
          src="https://anvilai.s3.us-east-2.amazonaws.com/profileBackground.png"
          alt="ProfileBackground"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          src={img}
          alt="Profile"
          className="absolute inset-0 w-full h-full z-10 object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
