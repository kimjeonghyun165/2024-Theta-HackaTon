import React from "react";
import { PriceCard } from "..";
import { plans } from "../../../constant/home";

const HomeSection6: React.FC = () => {
  return (
    <section id="pricing-section" className="flex flex-col">
      <div className="italic text-center">
        <h1 className="text-6xl">
          Pricing
        </h1>
        <h2 className="mt-8 text-2xl">Pricing base on annual subscription</h2>
      </div>
      <div className="flex flex-wrap justify-center mt-12">
        {plans.map((plan, index) => (
          <PriceCard key={index} index={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default HomeSection6;
