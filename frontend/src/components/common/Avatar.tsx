import React from "react";

interface AvatarProps {
  img: string | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ img }) => {
  return (
    <div className="avatar relative">
      <div className="rounded-full bg-white relative w-12">
        <img
          src="https://anvilai.s3.us-east-2.amazonaws.com/profileBackground.png"
          alt="ProfileBackground"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          src={img}
          alt="Profile"
          className="absolute inset-0 w-[80px] h-[80px] z-10 object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
