import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import { PiCheckCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function CartTopPickProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { products, loading, currentPage, category } = useSelector(
    (state) => state.products
  );

  const scrollRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
  }, [dispatch, currentPage, category]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const distance = direction === "right" ? 200 : -200;
      scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  const features = [
    "Free Delivery",
    "14* Days Free Returns & Exchange",
    "Safe & Secure Payment Options",
  ];

  return (
    <div className="w-full md:w-[960px] pt-8 px-4">
      {/* Title */}
      <h1 className="font-bold uppercase text-[26px] sm:text-[32px] md:text-[35px] mb-4">
        Top picks for you
      </h1>

      {/* Horizontal Scroll Area */}
      <div className="relative w-full group pb-4 overflow-x-scroll custom-scrollbar whitespace-nowrap cursor-pointer">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity border"
        >
          <LiaLongArrowAltLeftSolid className="w-5 h-5" />
        </button>

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 "
        >
          {products.map((item, idx) => (
            <div
              key={idx}
              className="w-[160px] sm:w-[180px] md:w-[190px] flex-shrink-0 snap-start"
            >
              {/* Image Box */}
              <div className="relative w-full h-[190px] sm:h-[200px] rounded overflow-hidden">
                <img
                  src={item?.image?.[0]}
                  alt={`product-${idx}`}
                  onClick={()=> navigate(`/product/${item._id}`)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full px-2">
                  <p className="bg-white text-black text-sm w-fit h-8 px-3 flex items-center justify-center rounded">
                    ₹{item?.price}
                  </p>
                </div>
              </div>
              {/* Product Name */}
              <p className="mt-2 text-center text-[14px] sm:text-[15px] text-black break-words">
                {item?.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity border"
        >
          <LiaLongArrowAltRightSolid className="w-5 h-5" />
        </button>
      </div>

      {/* Features */}
      <ul className="space-y-3 pt-8 sm:pt-10 md:pt-10 py-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-[16px] sm:text-[18px]">
            <PiCheckCircleLight className="text-black w-5 h-5 mt-1" />
            <p className="underline">{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartTopPickProduct;
