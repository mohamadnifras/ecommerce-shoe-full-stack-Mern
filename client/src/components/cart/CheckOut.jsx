// import React, { useEffect } from "react";
// import OrderContact from "./OrderContact";
// import OrderCart from "./OrderCart";
// import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../../features/cartSlice";

// function CheckOut() {
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.cart);
//   console.log(cart, "checkout");

//   useEffect(() => {
//     dispatch(getCart({ page: 1, limit: 100 }));
//   }, [dispatch]);
//   return (
//     <div className="w-full">
//       <div className="flex flex-col justify-center items-center pt-5">
//         <h1 className="uppercase font-bold md:text-[35px]">checkout</h1>
//         <p className="font-mono md:text-[18px] text-gray-500">
//           ({cart?.items.length} items)₹{cart?.totalItemPrice}.00
//         </p>
//       </div>

//       <div className="flex pt-10 w-full">
//         <div className="w-full"><OrderContact/></div>
//         <div className="w-full"><OrderCart /></div>
//       </div>
//     </div>
//   );
// }

// export default CheckOut;


import React, { useEffect } from "react";
import OrderContact from "./OrderContact";
import OrderCart from "./OrderCart";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/cartSlice";

function CheckOut() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  console.log(cart, "checkout");

  useEffect(() => {
    dispatch(getCart({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="flex flex-col justify-center items-center pt-5 text-center px-4">
        <h1 className="uppercase font-bold text-[25px] sm:text-[28px] md:text-[35px]">
          checkout
        </h1>
        <p className="font-mono text-sm sm:text-base md:text-[18px] text-gray-500">
          ({cart?.items.length} items) ₹{cart?.totalItemPrice}.00
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col md:flex-row gap-6 pt-10 w-full px-4 md:px-0">
        <div className="w-full md:w-1/2">
          <OrderContact />
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <OrderCart />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;

