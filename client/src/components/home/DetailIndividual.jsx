import React, { useState } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { CgHeart } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getCart } from "../../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailIndividual({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const pdct = product?.products?.[0];
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cart);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    try {
      await dispatch(addToCart({ productId: pdct._id, size: selectedSize, quantity: 1 })).unwrap();
      await dispatch(getCart({ page: 1, limit: 10 })).unwrap();
      toast.success("Product added to cart!");
    } catch (err) {
      if (err.message === "Product is out of stock") {
        toast.error("Product is out of stock!");
      } else if (err.message === "Product not found") {
        toast.error("Product not found!");
      } else {
        toast.error("Something went wrong while adding to cart.");
      }
    }
  };

  return (
    <div className="p-5 md:p-10 tracking-wider w-full max-w-md mx-auto">
      <p className="text-base font-normal font-sans">Originals</p>
      <p className="py-3 uppercase text-2xl md:text-3xl font-bold">{pdct?.name}</p>

      <p className="flex items-center font-bold pt-5 text-[18px] md:text-[20px]">
        <LuIndianRupee />
        {pdct?.price}
      </p>

      <div>
        <h6 className="font-bold pt-5 mb-3">Sizes</h6>
        <div className="grid grid-cols-3 gap-2 max-w-sm">
          {pdct?.size?.map((size, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSize(size)}
              className={`
                py-2 px-4 border text-sm rounded 
                ${selectedSize === size ? "bg-black text-white font-bold" : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex sm:flex-row sm:items-center space-x-3 space-y-3 sm:space-y-0">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="relative bg-black py-2.5 px-5 w-full font-medium uppercase text-white transition-all transform hover:scale-105 before:absolute before:top-1 before:left-1 before:-z-[0] before:h-full before:w-full before:border-2 before:border-black before:transition-all before:content-[''] hover:before:top-0 hover:before:left-0 hover:before:border-black flex justify-between items-center hover:text-gray-300"
        >
          {loading ? "Adding..." : "Add to Cart"}
          <LiaLongArrowAltRightSolid size={24} />
        </button>

        <div className="border-2 p-2 flex justify-center items-center w-12 h-12">
          <CgHeart size={24} />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-red-600 font-semibold">
          Failed to add to cart: {error}
        </p>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default DetailIndividual;
