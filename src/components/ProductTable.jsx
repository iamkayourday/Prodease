import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import { toast } from "react-toastify";

function ProductTable() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAdminLogin = () => {
    const password = prompt("Enter Admin Password:");
    if (password === "Products") {
      setIsAdmin(true);
      toast.success("Logged in as Admin!");
    } else {
      toast.error("Invalid password!");
    }
  };

  const handleRemove = (id) => {
    const product = products.find((p) => p.id === id);
    const action = prompt(
      `Enter quantity to remove or type "all" to delete ${product.name}:`
    );

    if (action === "all") {
      setProducts(products.filter((p) => p.id !== id));
      toast.success(`${product.name} removed successfully!`);
    } else if (!isNaN(action)) {
      const quantityToRemove = parseInt(action, 10);
      if (product.quantity >= quantityToRemove) {
        setProducts(
          products.map((p) =>
            p.id === id
              ? { ...p, quantity: p.quantity - quantityToRemove }
              : p
          )
        );
        toast.success(`Removed ${quantityToRemove} of ${product.name}!`);
      } else {
        toast.error(`Not enough quantity! Available: ${product.quantity}`);
      }
    } else {
      toast.error("Invalid input!");
    }
  };

  const handleAddUpdate = (product) => {
    if (product.id) {
      setProducts(
        products.map((p) => (p.id === product.id ? { ...p, ...product, date: new Date().toLocaleDateString() } : p))
      );
      toast.success("Product updated successfully!");
    } else {
      setProducts([
        ...products,
        { ...product, id: Date.now(), date: new Date().toLocaleDateString() },
      ]);
      toast.success("Product added successfully!");
    }
    setIsModalOpen(false);
  };

  const openModal = (product = null) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <button
          onClick={handleAdminLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
        >
          {isAdmin ? "Admin (Logged In)" : "Login as Admin"}
        </button>
        {isAdmin && (
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Product ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total</th>
              <th className="py-2">Date</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">${product.price * product.quantity}</td>
                <td className="border px-4 py-2">{product.date}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => openModal(product)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal
          product={editProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddUpdate}
        />
      )}
    </div>
  );
}

export default ProductTable;
