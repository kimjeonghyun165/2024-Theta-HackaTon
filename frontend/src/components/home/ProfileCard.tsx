import React from "react";

interface ProfileCardProps {
  image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  title: string;
  description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image: Image,
  name,
  title,
  description,
}) => (
  <div className="flex flex-col items-center my-4">
    <div className="overflow-hidden">
      <div className="flex justify-center transition-transform duration-300 transform hover:scale-110">
        <Image />
      </div>
    </div>
    <div className="flex flex-col w-4/5 my-4 text-left text-wrap">
      <h2 className="font-semibold">{name}</h2>
      <div>
        <h3>{title}</h3>
        <h4 className="mt-2 text-sm whitespace-pre-line">{description}</h4>
      </div>
    </div>
  </div >
);

export default ProfileCard;
