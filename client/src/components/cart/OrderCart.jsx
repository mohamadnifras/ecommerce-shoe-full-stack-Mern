import React from "react";
import { getCart } from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cart, loading, error } = useSelector((state) => state.cart);
  console.log(cart, "OrderCart");

  useEffect(() => {
    dispatch(getCart({ page: 1, limit: 100 }));
  }, [dispatch]);

  if (loading) return <p className="p-4 text-xl">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!cart) return <p className="p-4 text-gray-500 ">No cart data found.</p>;
  return (
    <div className="w-3/4  p-5 tracking-wider">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-bold uppercase">Your Cart</h2>
        <button 
        onClick={()=> navigate('/cart')}
        className="text-md underline font-medium uppercase hover:bg-black hover:text-white hover:underline hover:px-0.5">
          Edit
        </button>
      </div>

      <div className="space-y-2 text-[19px] font-mono">
        <div className="flex justify-between ">
          <span>{cart?.items.length} items</span>
          <span>₹{cart?.totalItemPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-black">Free</span>
        </div>

        <div className="border-b mb-2 pb-4">
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>₹{cart?.totalItemPrice}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">(Inclusive of all taxes)</p>
        </div>
      </div>
      {cart?.items.map((item) => {
        const product = item.productId;

        return (
          <div key={item._id} className="flex gap-4 pb-4 mt-5">
            <img
              src={product.image[0]} // First image from array
              alt={product.name}
              className="w-32 h-32 object-contain bg-gray-100"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-red-600 font-mono text-lg">₹{product.price}</p>
              <p className="text-sm">Size: {item.size}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderCart;
