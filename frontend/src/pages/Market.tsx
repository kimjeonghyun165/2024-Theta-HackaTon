import React from "react";
import { Layout } from "../components/common/layout/Layout";
import MarketSection1 from "../components/market/section/MarketSection1";
import MarketSection2 from "../components/market/section/MarketSection2";
import MarketSection3 from "../components/market/section/MarketSection3";
import MarketSection4 from "../components/market/section/MarketSection4";

const Market: React.FC = () => {

  return (
    <Layout>
      <section className="flex flex-col gap-24 px-32">
        <MarketSection1 />
        <MarketSection2 />
        <MarketSection3 />
        <MarketSection4 />
      </section>
    </Layout>
  );
};

export default Market;
