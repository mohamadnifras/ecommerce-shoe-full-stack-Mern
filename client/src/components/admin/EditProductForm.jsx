import React, { useState, useEffect } from 'react';
import { fetchProducts, editProduct } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditProductForm({ editModal, setEditModal, product }) {
  const dispatch = useDispatch();
  const { loading, currentPage, category } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    size: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [image, setImage] = useState([]);
  const [individualImages, setIndividualImages] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        size: product.size?.join(", ") || "",
        category: product.category || "",
        brand: product.brand || "",
        stock: product.stock || "",
      });

      setImage([]);
      setIndividualImages([]);
    }
  }, [product]);

  useEffect(()=>{
     dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
  },[dispatch])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === "image") {
      setImage(Array.from(e.target.files));
    } else {
      setIndividualImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    image.forEach((file) => data.append("image", file));
    individualImages.forEach((file) => data.append("individualImages", file));

    dispatch(editProduct({ id: product?._id, formData: data }))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts({ page: currentPage, limit: 10, category }));
        toast.success("Product updated successfully!");
        setEditModal(false);
      })
      .catch((err) => {
        toast.error(err || "Update failed");
      });
  };

  const closeModal = () => setEditModal(false);

  return (
    <>
      {editModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-center uppercase">
              Update Product
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />

              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 text-sm font-medium">
                  Main Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="p-2 border rounded w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 text-sm font-medium">
                  Individual Images (Multiple)
                </label>
                <input
                  type="file"
                  name="individualImages"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="p-2 border rounded w-full"
                />
              </div>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />

              <input
                type="text"
                name="size"
                placeholder="Size (e.g. 4, 5, 6, 7)"
                value={formData.size}
                onChange={handleChange}
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
                {loading ? "Uploading..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProductForm;





