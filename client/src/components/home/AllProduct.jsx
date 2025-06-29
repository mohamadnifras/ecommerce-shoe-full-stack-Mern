import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import { LuIndianRupee } from "react-icons/lu";
import HoverProduct from "./HoverProduct";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AllProduct({ searchTerm }) {
  const [hoverImages, setHoverImages] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, currentPage, category, hasMore, } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
  }, [dispatch, currentPage, category]);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(fetchProducts({ page: currentPage - 1, limit: 10, category }));
    }
  };

  const handleNext = () => {
    if (hasMore && !loading) {
      dispatch(fetchProducts({ page: currentPage + 1, limit: 10, category }));
    }
  };

  // console.log(totalProducts,'products')

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 text-lg mt-15">
              No products found..😞
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-6 w-fit mx-auto">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="w-full max-w-[350px] shadow-md rounded-lg hover:border group mx-auto sm:shadow-none sm:rounded-none"
                >
                  <div
                    onClick={() => {
                      if (user) {
                        navigate(`/product/${product._id}`);
                      } else {
                        toast.warning("Please login to view product details");
                      }
                    }}
                    className="relative cursor-pointer w-full overflow-hidden"
                  >
                    {/* Default Image */}
                    <img
                      src={product.image[0]}
                      alt="shoeproduct"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />

                    {/* Hover Image */}
                    <img
                      src={hoverImages || product.image[1]}
                      alt="shoeproduct-hover"
                      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </div>

                  <div className="hidden group-hover:block">
                    <HoverProduct
                      images={product.individualImages}
                      onHoverImageSelect={setHoverImages}
                    />
                  </div>

                  <div className="p-4 space-y-1">
                    <p className="text-[18px] font-bold text-gray-800 flex items-center">
                      <LuIndianRupee />
                      {product.price}
                    </p>
                    <p className="capitalize">{product.name}</p>
                    <p>{product.brand}</p>
                    <p>{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination Buttons */}
      {!searchTerm && filteredProducts.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!hasMore}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default AllProduct;
