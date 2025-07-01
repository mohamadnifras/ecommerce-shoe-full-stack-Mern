import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchIndividualProduct } from "../../features/productSlice";
import { CornerUpLeft } from "lucide-react";
import DetailIndividual from "./DetailIndividual";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Footer from "./Footer";

function IndividualProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    dispatch(fetchIndividualProduct(id));
  }, [dispatch, id]);

  const images = product?.products?.[0]?.individualImages || [];
  const displayedImages = showAllImages ? images : images.slice(0, 4);

  return (
    <>
    <div className="relative top-23 flex flex-col md:flex-row tracking-wider px-2">
      {/* Left section - Images */}
      <div className="w-full md:w-[1344px]">
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 gap-0.5 relative">
          {displayedImages.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={`product-${idx}`} className="w-full object-cover" />
            </div>
          ))}

          <button
            onClick={() => navigate(-1)}
            className="absolute flex items-center space-x-1 text-black underline text-[18px] left-3 top-5 font-bold cursor-pointer hover:text-orange-400"
            >
            <CornerUpLeft size={17} />
            <span>Back</span>
          </button>

          {images.length > 4 && (
            <button
            onClick={() => setShowAllImages(!showAllImages)}
            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 px-10 py-3 border-2 bg-[#FFFFFF] font-bold text-black text-[18px] cursor-pointer"
            >
              {showAllImages ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Mobile View - Swiper Carousel */}
        <div className="md:hidden w-full">
          <Swiper spaceBetween={10} slidesPerView={1.2} className="my-3">
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`product-mobile-${idx}`}
                  className="w-full h-[250px] object-cover rounded-lg"
                  />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-black underline text-[16px] font-bold mt-2 hover:text-orange-400"
            >
            <CornerUpLeft size={17} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Right section - Product Details */}
      <div className="w-full md:w-[567px] mt-5 md:mt-0">
        <DetailIndividual product={product} />
      </div>
      
    </div>
            </>
  );
}

export default IndividualProduct;
