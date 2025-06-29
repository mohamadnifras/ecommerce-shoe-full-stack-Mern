import React, { useEffect, useState } from "react";
import { addNewProduct, fetchProducts } from "../../features/productSlice";
import {useDispatch,useSelector} from "react-redux"
import { toast } from "react-toastify";


function NewProduct({ showModal, setShowModal }) {
  const dispatch = useDispatch()
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    size: "",
  });
   const [image, setImage] = useState([]);
  const [individualImages, setIndividualImages] = useState([]);
  const { loading, currentPage, category } = useSelector(
      (state) => state.products
    );

    useEffect(()=>{
      dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
    },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in productData) {
      formData.append(key, productData[key]);
    }

    
    image.forEach((img)=> formData.append("image", img))
    individualImages.forEach((img) => formData.append("individualImages", img));
    dispatch(addNewProduct(formData))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
        toast.success("Product added successfully!");
        setShowModal(false)
      })
      .catch((err) => {
        console.log(err,"addNewProduct")
        toast.error(err || "Failed to add product.");
      });
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-center uppercase">
              Add New Product
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                className="p-2 border rounded w-full"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                className="p-2 border rounded w-full"
              />

              {/* Image input with label */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 text-sm font-medium">
                  Main Image
                </label>
                <input
                  type="file"
                  name="image"
                 onChange={(e) => setImage([...e.target.files])}
                  accept="image/*"
                  multiple
                  className="p-2 border rounded w-full"
                />
              </div>

              {/* Individual Images input with label */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 text-sm font-medium">
                  Individual Images (Multiple)
                </label>
                <input
                  type="file"
                  name="individualImages"
                   onChange={(e) => setIndividualImages([...e.target.files])}
                  accept="image/*"
                  multiple
                  className="p-2 border rounded w-full"
                />
              </div>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                className="p-2 border rounded w-full"
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={productData.brand}
                onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                className="p-2 border rounded w-full"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={productData.stock}
                onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                className="p-2 border rounded w-full"
              />

              <input
                type="text"
                name="size"
                placeholder="Size (e.g. 4, 5, 6, 7)"
                value={productData.size}
                onChange={(e) => setProductData({ ...productData, size: e.target.value })}
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? "Uploading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewProduct;
