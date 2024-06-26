import { Layout } from "../../components/layout/layout";
import Section1 from "./section/section1";
import Section2 from "./section/section2";
import Section3 from "./section/section3";
import Section4 from "./section/section4";
import Section5 from "./section/section5";
import Section6 from "./section/section6";

const Home = () => {
  return (
    <Layout>
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
