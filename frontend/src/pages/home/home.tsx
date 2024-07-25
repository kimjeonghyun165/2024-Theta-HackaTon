import { Layout } from "../../components/common/layout/home/Layout";
import {
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
} from "./section/index";

const Home = () => {
  return (
    <Layout>
      <div className="relative w-full h-full"></div>
      <div className="relative min-h-screen">
        <div className="relative mt-24 z-10 h-[80vh]">
          <Section1 />
        </div>
        <div className="px-2 md:px-12 flex flex-col gap-60">
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
