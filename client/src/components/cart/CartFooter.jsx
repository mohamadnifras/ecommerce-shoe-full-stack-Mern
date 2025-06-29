import React from "react";
import { ImMobile } from "react-icons/im";

function CartFooter() {
  return (
    <footer className="bg-[#363738] w-full text-white text-sm tracking-wider py-5 px-4">
      <div className="space-y-3 max-w-3xl mx-auto">
        {/* First row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-5 text-center">
          <div className="flex items-center gap-2">
            <ImMobile size={18} />
            <p>Questions? +91 6238896686</p>
          </div>
          <p className="hidden sm:block">|</p>
          <p>8AM - 8PM, 7 days a week</p>
        </div>

        {/* Second row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center">
          <p>Privacy Statement</p>
          <p className="hidden sm:block">|</p>
          <p>Terms and Conditions</p>
        </div>

        {/* Third row */}
        <div className="flex justify-center items-center pt-3 text-gray-500 text-center">
          <p>© 2025 adidas India Marketing Private Limited</p>
        </div>
      </div>
    </footer>
  );
}

export default CartFooter;
