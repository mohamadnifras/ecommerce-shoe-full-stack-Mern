import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setCategory,
  deletedProduct,
} from "../../features/productSlice";
import styled from "styled-components";
import { MdLibraryAdd } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewProduct from "./NewProduct";
import EditProductForm from "./EditProductForm";

function AdminProducts() {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  const { products, loading, currentPage, category } = useSelector(
    (state) => state.products
  );

  // Fetch products when component mounts or filters change
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
  }, [dispatch, currentPage, category]);

  const handleFilter = (cat) => {
    dispatch(setCategory(cat === "All" ? "" : cat.toLowerCase()));
  };

  const handleDelectProduct = (productId) => {
    dispatch(deletedProduct(productId))
      .then(() => {
        dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
        toast.success("Product deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        toast.error("Failed to delete the product.");
      });
  };

  return (
    <div className="p-4 pb-10 max-w-full overflow-x-hidden">
      {/* Top Filter Navbar + Add Product Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["All", "Man", "Women", "Kids"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                category === (cat === "All" ? "" : cat.toLowerCase())
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add Product Button */}
        <div className="self-start sm:self-auto">
          <StyledWrapper>
            <button onClick={() => setShowModal(true)}>
              <span className="icon">
                <MdLibraryAdd />
              </span>
              <span className="label">Add Product</span>
            </button>
          </StyledWrapper>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[900px] w-full border border-gray-200 divide-y divide-gray-200 shadow rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Price</th>
              <th className="p-3 text-left font-semibold">Image</th>
              <th className="p-3 text-left font-semibold">Category</th>
              <th className="p-3 text-left font-semibold">Brand</th>
              <th className="p-3 text-left font-semibold">Stock</th>
              <th className="p-3 text-left font-semibold">Size</th>
              <th className="p-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product,index) => (
              <tr key={index}>
                <td className="p-3">{product.name}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                  />
                </td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.size?.join(", ")}</td>
                <td className="p-3 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setEditModal(true);
                    }}
                    className="bg-[#363738] text-white px-3 py-1 rounded hover:bg-neutral-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelectProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Loading/Empty States */}
        {loading && (
          <p className="text-center mt-4 text-gray-500">Loading...</p>
        )}
        {!loading && products.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No products found.</p>
        )}
      </div>
      <NewProduct showModal={showModal} setShowModal={setShowModal} />
      <EditProductForm editModal={editModal} setEditModal={setEditModal}  product={selectedProduct}/>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

const StyledWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 9em;
    height: 3em;
    border-radius: 30em;
    font-size: 15px;
    font-family: inherit;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: #000;
    background: #f0f0f0;
    font-weight: 500;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
    transition: color 0.3s ease;
  }

  button::before {
    content: "";
    width: 0;
    height: 3em;
    border-radius: 30em;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
    transition: 0.5s ease;
    z-index: -1;
  }

  button:hover::before {
    width: 9em;
  }

  button:hover {
    color: #000;
  }

  .icon {
    font-size: 1.2em;
  }

  .label {
    font-size: 0.9em;
  }
`;

export default AdminProducts;


