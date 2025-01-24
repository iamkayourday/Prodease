import React, { useState, useEffect } from 'react';
import SalesModal from './SalesModal';
import { toast } from 'react-toastify';

const SalesTable = () => {
  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSale, setEditSale] = useState(null);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  const handleAddUpdateSale = (sale) => {
    if (sale.id) {
      setSales(sales.map((s) => (s.id === sale.id ? { ...s, ...sale, date: new Date().toLocaleDateString() } : s)));
      toast.success('Sale updated successfully!');
    } else {
      setSales([
        ...sales,
        { ...sale, id: Date.now(), date: new Date().toLocaleDateString() },
      ]);
      toast.success('Sale added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteSale = (id) => {
    setSales(sales.filter((s) => s.id !== id));
    toast.success('Sale deleted successfully!');
  };

  const openModal = (sale = null) => {
    setEditSale(sale);
    setIsModalOpen(true);
  };

  const groupByDate = () => {
    return sales.reduce((acc, sale) => {
      const date = sale.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(sale);
      return acc;
    }, {});
  };

  const groupedSales = groupByDate();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
        >
          Add Sale
        </button>
      </div>

      {Object.keys(groupedSales).map((date) => (
        <div key={date} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{date}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Product Name</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedSales[date].map((sale) => (
                  <tr key={sale.id}>
                    <td className="border px-4 py-2">{sale.name}</td>
                    <td className="border px-4 py-2">{sale.quantity}</td>
                    <td className="border px-4 py-2">₦{sale.price}</td>
                    <td className="border px-4 py-2">₦{sale.price * sale.quantity}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => openModal(sale)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteSale(sale.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="border px-4 py-2 text-right font-bold">Grand Total</td>
                  <td className="border px-4 py-2 font-bold">
                    ₦{groupedSales[date].reduce((total, sale) => total + sale.price * sale.quantity, 0)}
                  </td>
                  <td className="border px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <SalesModal
          sale={editSale}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddUpdateSale}
        />
      )}
    </div>
  );
};

export default SalesTable;
