// import React, { useEffect } from "react";
// import { ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
// import CheckOut from "./CheckOut";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../../features/cartSlice";

// function Order() {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.cart);
//   console.log(cart?.items.length, "order");

//   useEffect(() => {
//     dispatch(getCart({ page: 1, limit: 100 }));
//   }, [dispatch]);
//   return (
//     <div className="w-full tracking-wider">
//       <div className="flex justify-between w-full items-center  px-4 py-3  md:px-52 md:py-6 border-b border-b-gray-300">
//         <div>
//           <Link to="/">
//             <img src="/shoe.png" alt="shoe" className="w-[50px] h-[50px]" />
//           </Link>
//         </div>
//         <Link to="/cart" className="relative">
//           <div>
//             <ShoppingCart size={28} />
//             {cart?.items?.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                 {cart?.items.length}
//               </span>
//             )}
//           </div>
//         </Link>
//       </div>

//       <div className="flex justify-between w-full items-center  px-4 py-3  md:px-52 md:py-4 border-b border-b-gray-300">
//         <div className="uppercase font-bold text-[20px]">Hi, Mohamad!</div>

//         <div className="font-bold text-[20px]">
//           <span className="text-amber-400">
//             Track <span className="text-red-500">Toes</span>
//           </span>
//         </div>
//       </div>
//       <div>
//         <CheckOut />
//       </div>
//     </div>
//   );
// }

// export default Order;


import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CheckOut from "./CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/cartSlice";
import CartFooter from "./CartFooter";

function Order() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  console.log(cart?.items.length, "order");

  useEffect(() => {
    dispatch(getCart({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <div className="w-full tracking-wider">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 md:px-10 lg:px-52 md:py-6">
        <Link to="/">
          <img src="/brandlogo1.png" alt="ordershoelogo" className="w-20 h-10 sm:w-22 sm:h-12" />
        </Link>

        <Link to="/cart" className="relative">
          <ShoppingCart size={28} />
          {cart?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-[10px] sm:text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cart?.items.length}
            </span>
          )}
        </Link>
      </div>

      {/* Greeting & Brand Name */}
      <div className="flex flex-row justify-between items-start md:items-center gap-2 px-4 py-3 border-b border-gray-300 md:px-10 lg:px-52 md:py-4">
        <div className="uppercase font-semibold text-[16px] sm:text-[18px] md:text-[20px]">
          Hi, Mohamad!
        </div>

        <div className="font-bold text-[16px] sm:text-[18px] md:text-[20px]">
          <span className="text-amber-400">
            Track <span className="text-red-500">Toes</span>
          </span>
        </div>
      </div>

      {/* Main Checkout Section */}
      <div className="px-2 sm:px-4 md:px-10 lg:px-52 py-4">
        <CheckOut />
      </div>
      <CartFooter />
    </div>
  );
}

export default Order;

