import React from "react";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

function CartOrderSummary({ product }) {
  const navigate = useNavigate();

  return (
    <div className="tracking-wider md:mt-20 px-4 sm:px-10 w-full py-3 md:py-0">
      <h1 className="uppercase text-black font-bold text-lg sm:text-xl mb-4">
        Order Summary
      </h1>

      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex justify-between text-sm sm:text-base">
          <span>{product.items?.length || 0} items</span>
          <span>₹{product.totalItemPrice || 0}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span>Delivery</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold text-base sm:text-lg">
          <span>Total</span>
          <span>₹{product.totalItemPrice || 0}</span>
        </div>
      </div>

      <span className="text-sm sm:text-base">(Inclusive of all taxes)</span>

      <div className="mt-8">
        <button
          onClick={() => navigate("/order")}
          className="relative -top-1 -left-1 bg-black py-3 px-5 w-full sm:w-[350px] uppercase text-white transition-all transform hover:scale-105 hover:top-0 hover:left-0 before:absolute before:top-1 before:left-1 before:-z-[0] before:h-full before:w-full sm:before:w-[350px] before:border-2 before:border-black before:transition-all before:content-[''] hover:before:top-0 hover:before:left-0 hover:text-gray-300 font-bold flex justify-between items-center"
        >
          Checkout
          <LiaLongArrowAltRightSolid size={24} />
        </button>
      </div>

      <div className="mt-6">
        <h2 className="font-medium uppercase text-xs sm:text-sm">Accepted payment methods</h2>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <img src="/icon-adidas-mastercard.svg" alt="Mastercard" className="h-6" />
          <img src="/icon-adidas-online-banking.svg" alt="Bank" className="h-6" />
          <img src="/icon-adidas-visa.svg" alt="Visa" className="h-6" />
          <img src="/icon-adidas-rupay.svg" alt="RuPay" className="h-6" />
          <img src="/icon-adidas-upi.svg" alt="UPI" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default CartOrderSummary;
