import React from "react";
import { Layout } from "../components/common/layout/Layout";
import MarketSection1 from "../components/market/marketSection1/MarketSection1";
import MarketSection2 from "../components/market/marketSection2/MarketSection2";
import MarketSection3 from "../components/market/marketSection3/MarketSection3";
import MarketSection4 from "../components/market/MarketSection4";

const Market: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-36 mt-10 w-full">
        <MarketSection1 />
        <div className="flex flex-col gap-24 w-full">
          <div className="mx-auto">
            <MarketSection2 />
          </div>
          <div className="mx-auto">
            <MarketSection3 />
          </div>
          {/* <MarketSection4 /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Market;
