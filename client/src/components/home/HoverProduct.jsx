import React, { useRef } from 'react';
import { LiaLongArrowAltLeftSolid,LiaLongArrowAltRightSolid } from "react-icons/lia";

function HoverProduct({ images, onHoverImageSelect  }) {
  const scrollRef = useRef();

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full group cursor-pointer">
      {/* Scroll Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-[23px] -translate-y-1/2 bg-white  p-1 shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <LiaLongArrowAltLeftSolid className="w-4 h-4" />
      </button>

      {/* Image Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar py-0.5"
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            onMouseEnter={() => onHoverImageSelect(img)}
            onMouseLeave={() => onHoverImageSelect(null)}
            className="w-[54px] h-[44px] object-cover  flex-shrink-0"
          />
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-[23px] -translate-y-1/2 bg-white  p-1 shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <LiaLongArrowAltRightSolid className="w-4 h-4" />
      </button>
    </div>
  );
}

export default HoverProduct;
