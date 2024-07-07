import React from "react";
import { ProfileCard } from "../../../components/home";
import { profiles } from "../../../constant/home";

const Section4: React.FC = () => {
  return (
    <section className="flex flex-col">
      <div className="text-center">
        <h1 className="font-semibold text-6xl">The Blacksmiths</h1>
      </div>
      <div className="mx-auto mt-40 w-full flex justify-center">
        <div className="flex flex-wrap justify-center items-start">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              image={profile.image}
              name={profile.name}
              title={profile.title}
              description={profile.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4;
