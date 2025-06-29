import React, { useState } from "react";
function OrderDetails({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  console.log(order, "vanoooo?");

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2 bg-[#212121] hover:bg-[#424242] text-white rounded-md shadow"
      >
        Details
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-2 sm:px-4 py-4 sm:py-6x no-scrollbar "
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-2xl md:rounde-lg p-4 sm:p-6 shadow-xl max-h-full  overflow-y-auto no-scrollbar "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <h2 className="text-sm font-mono mb-3 text-center tracking-tight">
              Track Toes - Order confirmation
            </h2>
            <p className="uppercase text-xl font-extrabold mb-4 text-center">
              Thank you for your order
            </p>

            {/* Summary Row */}
            <div className="flex flex-col sm:flex-row justify-between text-sm border-b pb-4 gap-4">
              <div className="text-gray-700 sm:w-2/3">
                <p className="font-mono tracking-wide">
                  You can use this to track your Order details. We appreciate
                  your business! You will receive email communication at
                  <span className="font-bold text-black">
                    {" "}
                    nifrasvp9@gmail.com{" "}
                  </span>
                  to keep you updated on this status of your order.
                </p>
              </div>
              <div className="sm:w-1/3 sm:text-right text-gray-800 space-y-2 text-sm tracking-wide uppercase">
                <div className="flex justify-between sm:justify-end sm:gap-4">
                  <span className="font-bold text-black">ORDER ID:</span>
                  <span className="font-medium">{order?._id?.slice(-7)}</span>
                </div>
                <div className="flex justify-between sm:justify-end sm:gap-4">
                  <span className="font-bold text-black">ORDER DATE:</span>
                  <span className="font-medium">
                    {new Date(order?.createdAt).toISOString().slice(0, 10)}
                  </span>
                </div>
                <div className="flex justify-between sm:justify-end sm:gap-4">
                  <span className="font-bold text-black">ORDER TOTAL:</span>
                  <span className="font-medium">{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Shipping Details Title */}
            <div className="border-b mt-6">
              <h1 className="uppercase text-xl font-extrabold pb-3">
                Order summary for...
              </h1>
              <h5 className="uppercase font-bold text-gray-400 text-sm">
                Shipping details
              </h5>
            </div>

            {/* Item List */}
            <div className="space-y-2 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-bold text-xs sm:text-sm border-b pb-2">
                <div>Item</div>
                <div>Delivery Status</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Unit Price</div>
                <div className="text-right">Total</div>
              </div>

              {order?.items?.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs sm:text-sm border-b py-2"
                >
                  <div>
                    <p>{item.productId?.name}</p>
                    <p className="text-gray-600 text-xs">SIZE: {item.size}</p>
                  </div>
                  <div className="text-center">Delivered</div>
                  <div className="text-center">{item.quantity}</div>
                  <div className="text-right">
                    ₹{item.productId?.price.toFixed(2)}
                  </div>
                  <div className="text-right">
                    ₹{(item.quantity * item.productId?.price).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Shipping Address */}
              <div className="text-sm mt-4">
                <h3 className="font-bold mb-1">Ship To</h3>
                <p>{order.shippingAddress.fullName},</p>
                <p>{order.shippingAddress.address},</p>
                <p>{order.shippingAddress.state},</p>
                <p>{order.shippingAddress.city} - {order.shippingAddress.postalCode}</p>
                <p>Phone Number: {order.shippingAddress.phoneNumber}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="pt-4 border-t mt-4">
              <h5 className="uppercase font-bold text-gray-400 text-sm mb-3">
                Payment details
              </h5>
              <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">
                <div className="text-black font-mono tracking-tight">
                  <h6 className="font-bold">Payment Method</h6>
                  <p className="uppercase">Online</p>
                </div>
                <div className="text-black font-mono tracking-tight sm:text-right">
                  <h6 className="font-bold">Cost Summary</h6>
                  <div className="flex justify-between sm:justify-end sm:gap-4">
                    <span>Order Discounts</span>
                    <span>-₹0.00</span>
                  </div>
                  <div className="flex justify-between sm:justify-end sm:gap-4">
                    <span>Total Order Cost</span>
                    <span>{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
