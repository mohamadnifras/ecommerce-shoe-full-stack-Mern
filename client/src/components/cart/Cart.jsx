import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../features/cartSlice";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import CartTopPickProduct from "./CartTopPickProduct";
import CartFooter from "./CartFooter";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );

  return (
    <div className="pt-20 tracking-wider w-full h-full flex flex-col justify-between">
      {!cart || cart.items?.length === 0 ? (
        <div className="flex flex-col space-y-9 p-6 sm:p-10 md:p-20 md:h-[563px] h-[572px]">
          <p className="text-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase">
            Your cart is empty
          </p>
          <p className="text-black tracking-wider font-mono text-sm sm:text-base">
            Once you add something to your bag - it will appear here. Ready to
            get started?
          </p>
          <button
            onClick={() => navigate("/")}
            className="relative -top-1 -left-1 bg-black py-3 px-5 w-full sm:w-[350px] uppercase text-white transition-all transform hover:scale-105 hover:top-0 hover:left-0 before:absolute before:top-1 before:left-1 before:-z-[0] before:h-full before:w-full sm:before:w-[350px] before:border-2 before:border-black before:transition-all before:content-[''] hover:before:top-0 hover:before:left-0 hover:text-gray-300 font-bold flex justify-between items-center"
          >
            get started
            <LiaLongArrowAltRightSolid size={30} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="w-full lg:w-2/3 md:py-16 px-4 sm:px-10">
            <h1 className="font-bold uppercase text-2xl sm:text-3xl md:text-4xl">
              Your Bag
            </h1>
            <p className="pt-1 sm:pt-2 text-sm sm:text-base">
              TOTAL ({cart.items?.length || 0} items){" "}
              <strong>₹{cart?.totalItemPrice || 0}</strong>
            </p>
            <p className="pt-0.5 sm:pt-2 text-sm sm:text-base leading-relaxed text-black">
              Items in your bag are not reserved — check out
              <br className="block sm:hidden" /> now to make them yours.
            </p>

            <div className="flex flex-col gap-5 mt-5 ">
              {cart?.items?.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            <div className="hidden md:block">
              <CartTopPickProduct />
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-4 sm:px-10">
            <CartOrderSummary product={cart} />
          </div>
          <div className="block md:hidden px-4 sm:px-10">
            <CartTopPickProduct />
          </div>
        </div>
      )}

      <CartFooter />
    </div>
  );
}

export default Cart;
