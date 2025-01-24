import React, { useState } from "react";

function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(
    product || { name: "", price: "", quantity: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) {
      alert("All fields are required!");
      return;
    }
    onSave({ ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity, 10) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
