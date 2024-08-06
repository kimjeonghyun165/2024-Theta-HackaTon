import { Layout } from "../components/common/layout/Layout";
import HomeSection1 from "../components/home/section/HomeSection1";
import HomeSection2 from "../components/home/section/HomeSection2";
import HomeSection3 from "../components/home/section/HomeSection3";
import HomeSection4 from "../components/home/section/HomeSection4";
import HomeSection5 from "../components/home/section/HomeSection5";
import HomeSection6 from "../components/home/section/HomeSection6";
import HomeSection7 from "../components/home/section/HomeSection7";

const Home = () => {
  return (
    <Layout>
      <div className="relative w-full h-full"></div>
      <div className="relative min-h-screen">
        <div className="relative mt-24 z-10 h-[80vh]">
          <HomeSection1 />
        </div>
        <div className="flex flex-col px-2 md:px-12 gap-60">
          <HomeSection2 />
          <HomeSection3 />
          <HomeSection4 />
          <HomeSection5 />
          <HomeSection6 />
          <HomeSection7 />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
