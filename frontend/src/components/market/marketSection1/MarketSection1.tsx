import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MarketSection1 = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <div className="slider-container min-w-[1256px] h-[650px] bg-third rounded-3xl">
      <Slider {...settings} className="h-full" arrows={false}>
        <div className="h-full">
          <Card
            imageSrc={"/1.png"}
            title={"ELK MAN WITH FOUR HORNS"}
            artistName={"Macallan Craigellachie"}
            artistProfile={"/1.png"}
            price={0.792}
            description={
              "DESCRIPTION this is an example of a description. Users can provide details about their artwork, such as the intention behind it, the appeal of their 3D assets, and relevant keywords."
            }
            likes={0}
          />
        </div>
        <Card
          imageSrc={"/1.png"}
          title={"ELK MAN WITH FOUR HORNS"}
          artistName={"Macallan Craigellachie"}
          artistProfile={"/1.png"}
          price={0.792}
          description={
            "DESCRIPTION this is an example of a description. Users can provide details about their artwork, such as the intention behind it, the appeal of their 3D assets, and relevant keywords."
          }
          likes={0}
        />
        <Card
          imageSrc={"/1.png"}
          title={"ELK MAN WITH FOUR HORNS"}
          artistName={"Macallan Craigellachie"}
          artistProfile={"/1.png"}
          price={0.792}
          description={
            "DESCRIPTION this is an example of a description. Users can provide details about their artwork, such as the intention behind it, the appeal of their 3D assets, and relevant keywords."
          }
          likes={0}
        />
      </Slider>
    </div>
  );
};

export default MarketSection1;
