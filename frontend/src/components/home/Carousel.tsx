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
    <div className="w-full">
      <div
        className="w-full p-4 space-x-4 overflow-x-scroll carousel carousel-center no-scrollbar"
        ref={carouselRef}
      >
        {images.map((image, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg carousel-item">
            <img src={image.src} />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-2 text-white transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
              <div className="mb-4 ml-4">
                <p className="italic font-bold">{image.name}</p>
                <p>{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
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
