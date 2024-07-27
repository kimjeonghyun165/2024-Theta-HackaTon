import React from "react";
import { ProfileCard } from "../../../components/home";
import { profiles } from "../../../constant/home";

const Section4: React.FC = () => {
  return (
    <section className="flex flex-col">
      <div className="text-center">
        <h1 className="text-6xl font-semibold">The Blacksmiths</h1>
      </div>
      <div className="flex justify-center w-full mx-auto mt-40">
        <div className="grid grid-cols-2 md:grid-cols-4">
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
