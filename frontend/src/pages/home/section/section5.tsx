import React from "react";
import { PriceCard } from "../../../components/home";
import { plans } from "../../../constant/home";

const Section5: React.FC = () => {
  return (
    <section className="flex flex-col">
      <div className="text-center">
        <h1 className="italic text-6xl">
          Pricing
          <p className="text-2xl mt-8">Pricing base on annual subscription</p>
        </h1>
      </div>
      <div className="flex flex-wrap justify-center mt-12">
        {plans.map((plan, index) => (
          <PriceCard key={index} index={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default Section5;
