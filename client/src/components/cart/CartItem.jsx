import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { CgHeart } from "react-icons/cg";
import { updateQuantity, getCart, removeCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartItem({ item }) {
  const product = item?.productId;
  const dispatch = useDispatch();

  const updateProductQuantiy = async (
    productId,
    action,
    currentQuantity,
    stock,
    size
  ) => {
    try {
      if (action === "increase" && currentQuantity >= stock) {
        toast.error("Cannot increase quantity. Stock limit reached.");
        return;
      }

      if (action === "decrease" && currentQuantity <= 1) {
        toast.error("Cannot decrease quantity below 1.");
        return;
      }
      await dispatch(updateQuantity({ productId, action, size })).unwrap();
      toast.success(
        `Quantity ${action === "increase" ? "Increased" : "Decreased"}`
      );
      dispatch(getCart({ page: 1, limit: 100 }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleProductDelecte = (productId) => {
    dispatch(removeCart(productId))
      .unwrap()
      .then((response) => {
        console.log(response, "hello ZZZZ");
        toast.success(response.message);
        dispatch(getCart({ page: 1, limit: 100 }));
      })
      .catch((error) => {
        toast.error(error.message || "Failed to remove item");
      });
  };

  return (
    <div className="relative flex md:border lg:w-[956px] lg:h-[250px] h-[150px] w-[360px]">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Close Icon */}
      <button
        onClick={() => handleProductDelecte(product?._id)}
        className="absolute top-2 right-1 text-3xl hover:text-gray-600 cursor-pointer"
      >
        <MdClose />
      </button>
      {/* Heart Icon */}
      <button className="absolute top-16 md:right-2 right-1 text-2xl text-black hover:text-gray-600">
        <CgHeart />
      </button>
      {/* Product Image */}
      <div className="md:w-1/4 w-full bg-gray-10 flex justify-center items-center">
        <img
          src={product.image?.[0]}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      {/* Product Details */}
      <div className="px-4 w-[690px] md:mt-6 mt-3.5 uppercase">
        <div className="md:flex justify-between">
          <h2 className="md:text-xl tracking-tight text-black">{product?.name}</h2>
          <p className="text-[20px] text-red-500">₹{product?.price}</p>
        </div>
        <p className="text-md text-black md:mt-5">Size: {item?.size}</p>
        {/* Quantity Controls */}
        <div className="flex items-center md:mt-6 mt-2 space-x-4">
          <p className="hidden md:block text-md text-black ">Quantity:</p>
          <div className="flex items-center border rounded px-2">
            <button
              onClick={() =>
                updateProductQuantiy(
                  product?._id,
                  "decrease",
                  item?.quantity,
                  item?.stock,
                  item?.size
                )
              }
              className="text-lg font-bold px-2 hover:text-red-500"
            >
              –
            </button>
            <span className="px-4 font-bold">{item?.quantity}</span>
            <button
              onClick={() =>
                updateProductQuantiy(
                  product?._id,
                  "increase",
                  item?.quantity,
                  item?.stock,
                  item?.size
                )
              }
              className="text-lg font-bold px-2 hover:text-green-500"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
