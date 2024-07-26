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
    <Image />
    <div className="text-left text-wrap my-4 flex flex-col w-4/5">
      <p className="font-semibold">{name}</p>
      <div>
        <p>{title}</p>
        <p className="text-sm mt-2 whitespace-pre-line">{description}</p>
      </div>
    </div>
  </div>
);

export default ProfileCard;
