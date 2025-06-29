import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function HeroSection() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const images = [
    "/homeherosection.avif",
    "/homeherosection3.jpg",
    "/homeherosection4.jpg",
    "/homeherosection2.jpg",
  
  ];

  return (
    <div className="w-full min-h-full overflow-hidden flex justify-center md:items-center ">
      <div className="relative h-[400px] w-[420px]  md:w-full md:h-[700px] mt-15 md:mt-23 ">
        <Swiper
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center w-full h-full"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full md:object-cover object-center sm:object-fill"
              />
              
            </SwiperSlide>
          ))}

          <div
            className="absolute right-4 bottom-4 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 font-bold text-[var(--swiper-theme-color)]"
            slot="container-end"
          >
            <svg
              viewBox="0 0 48 48"
              ref={progressCircle}
              className="absolute left-0 top-0 w-full h-full rotate-[-90deg]"
              style={{
                strokeWidth: "4px",
                stroke: "var(--swiper-theme-color)",
                fill: "none",
                strokeDasharray: "125.6",
                strokeDashoffset: "calc(125.6px * (1 - var(--progress)))",
              }}
            >
              <circle cx="24" cy="24" r="20" />
            </svg>
            <span ref={progressContent} className="text-xs sm:text-sm"></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSection;




