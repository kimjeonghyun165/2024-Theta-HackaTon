import React, { useRef } from "react";

interface ImageData {
  src: string;
  name: string;
  description: string;
}

interface CarouselProps {
  images: ImageData[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemWidth = 300; // 예시: 각 사진의 너비

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="carousel carousel-center bg-neutral w-full space-x-4 p-4 overflow-x-scroll no-scrollbar"
        ref={carouselRef}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item relative">
            <img src={image.src} className="rounded-lg" />
            <div className="absolute inset-0 flex flex-col justify-end items-start bg-black bg-opacity-50 text-white p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="ml-4 mb-4">
                <p className="italic font-bold">{image.name}</p>
                <p>{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button onClick={scrollLeft} className="btn btn-circle">
          ❮
        </button>
        <button onClick={scrollRight} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
