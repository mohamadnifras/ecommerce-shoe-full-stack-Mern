import React from "react";

function UserOrder({ showOrder, setShowOder, order }) {
  if (!showOrder) return null;
  const closeModal = ()=> setShowOder(false)

  return (
    <div 
    onClick={closeModal}
    className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg overflow-y-auto no-scrollbar max-h-[90%]">
        <h2 className="text-xl font-serif mb-4 uppercase">Order Details</h2>

        {!Array.isArray(order) || order.length === 0 ? (
          <p className="font-mono">No orders found.</p>
        ) : (
          order.map((ord,idx) => (
            <div key={idx} className="mb-6 border-b pb-4 font-mono">
              <p>
                <strong>Order ID:</strong> {ord._id}
              </p>
              <p>
                <strong>Status:</strong> {ord.status}
              </p>
              <p>
                <strong>Total:</strong> ₹{ord.totalAmount}
              </p>
              <p>
                <strong>Payment:</strong> {ord.paymentStatus}
              </p>
              <p className="mt-2 font-semibold">Shipping Address:</p>
              <p>{ord.shippingAddress.fullName}</p>
              <p>{ord.shippingAddress.address}</p>
              <p>
                {ord.shippingAddress.city}, {ord.shippingAddress.state} -{" "}
                {ord.shippingAddress.postalCode}
              </p>
              <p>Phone: {ord.shippingAddress.phoneNumber}</p>

              <div className="mt-4">
                <p className="font-semibold mb-2">Products:</p>
                {ord.items.map((item) => (
                  <div
                    key={item.productId._id}
                    className="border p-2 rounded mb-2"
                  >
                    <img
                      src={item.productId.image[0]}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <p>
                      <strong>Name:</strong> {item.productId.name}
                    </p>
                    <p>
                      <strong>Brand:</strong> {item.productId.brand}
                    </p>
                    <p>
                      <strong>Size:</strong> {item.size}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.productId.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setShowOder(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UserOrder;
