// import React, { useEffect } from "react";
// import { fetchUserOrder } from "../../features/orderSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaTruck } from "react-icons/fa";
// import { GoLocation } from "react-icons/go";
// import OrderDetails from "./OrderDetails";

// function OrderCard() {
//   const dispatch = useDispatch();

//   const { orders, loading } = useSelector((state) => state.order);
//   console.log(orders, "hello fetchUserOrder");
//   useEffect(() => {
//     dispatch(fetchUserOrder());
//   }, [dispatch]);

//   return (
//     <div className="tracking-wider w-full bg-gray-100 min-h-screen">
//       <div className="pt-30 pl-10">
//         <h1 className="uppercase text-[30px] text-black font-bold">
//           My Orders
//         </h1>
//         <div className=" p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {orders?.map((order, index) => (
//             <div key={index} className="bg-white rounded-xl shadow ">
//               <div className="p-4">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-sm text-gray-500">Order ID</p>
//                     <h2 className="text-xl font-bold">
//                       #{order?._id?.slice(-7)}
//                     </h2>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
//                       Order Date :{" "}
//                       {new Date(order?.createdAt).toISOString().slice(0, 10)}
//                     </span>
//                     <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                       {order?.status}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between w-full gap-4">
//                   {/* From Location */}
//                   <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-1 rounded-full text-sm text-black">
//                     <FaTruck className="text-black" />
//                     <span>Gurugram,Kolkata,India</span>
//                   </div>

//                   {/* Arrow Dotted Line */}
//                   <div className="flex-1 text-center">
//                     <span className="text-black text-xl">⋯⋯⋯→</span>
//                   </div>

//                   {/* To Location */}
//                   <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-1 rounded-full text-sm text-black">
//                     <GoLocation className="text-black" />
//                     <span className="truncate max-w-[250px]">
//                       {order.shippingAddress.address}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto p-1  h-[110px]">
//                   {order?.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center  gap-3 bg-white rounded-xl shadow-md p-3 min-w-[220px]"
//                     >
//                       <img
//                         src={item?.productId?.image?.[0]}
//                         alt={item.productId?.name}
//                         className="w-20 h-20 object-contain rounded-md"
//                       />
//                       <div className="flex flex-col">
//                         <h3 className="font-semibold text-sm">
//                           {item.productId?.name}
//                         </h3>
//                         <p className="text-sm text-gray-800 font-bold">
//                           {item.productId?.price}{" "}
//                           <span className="text-xs text-gray-500">
//                             x{item.quantity}
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Size:{" "}
//                           <span className="font-medium text-black">
//                             {item.size}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-gray-200 flex justify-between items-center rounded-bl-xl rounded-br-xl p-3">
//                 <h2 className="text-black font-mono uppercase">
//                   total:{order?.totalAmount}
//                 </h2>
//                 {/* <button className="mt-2 bg-black text-white px-6 py-1 rounded-full hover:bg-gray-800 cursor-pointer">
//                   Details
//                 </button> */}
//                 <OrderDetails />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>

//   );
// }

// export default OrderCard;

import React, { useEffect } from "react";
import { fetchUserOrder } from "../../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaTruck } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import OrderDetails from "./OrderDetails";

function OrderCard() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);

  return (
    <div className="tracking-wider w-full bg-gray-100 min-h-screen">
      <div className="pt-10 pl-4 sm:pl-10">
        <h1 className="uppercase text-[30px] text-black font-bold">
          My Orders
        </h1>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders?.map((order, index) => (
            <div key={index} className="bg-white rounded-xl shadow">
              <div className="p-4 space-y-4">
                {/* Order ID and Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <h2 className="text-xl font-bold">
                      #{order?._id?.slice(-7)}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                      Order Date:{" "}
                      {new Date(order?.createdAt).toISOString().slice(0, 10)}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {order?.status}
                    </span>
                  </div>
                </div>

                {/* Delivery Route */}
                <div className="flex flex-wrap items-center justify-between w-full gap-4">
                  <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-1 rounded-full text-sm text-black">
                    <FaTruck className="text-black" />
                    <span>Gurugram,Kolkata,India</span>
                  </div>

                  <div className="flex-1 text-center">
                    <span className="text-black text-xl">⋯⋯⋯→</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-1 rounded-full text-sm text-black">
                    <GoLocation className="text-black" />
                    <span className="truncate max-w-[250px]">
                      {order.shippingAddress.address}
                    </span>
                  </div>
                </div>

                {/* Ordered Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto p-1 h-[110px]">
                  {order?.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white rounded-xl shadow-md p-3 min-w-[220px]"
                    >
                      <img
                        src={item?.productId?.image?.[0]}
                        alt={item.productId?.name}
                        className="w-20 h-20 object-contain rounded-md"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-sm">
                          {item.productId?.name}
                        </h3>
                        <p className="text-sm text-gray-800 font-bold">
                          {item.productId?.price}{" "}
                          <span className="text-xs text-gray-500">
                            x{item.quantity}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Size:{" "}
                          <span className="font-medium text-black">
                            {item.size}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Details */}
              <div className="bg-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2 rounded-bl-xl rounded-br-xl p-3">
                <h2 className="text-black font-mono uppercase">
                  Total: {order?.totalAmount}
                </h2>

                <OrderDetails order={order}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
