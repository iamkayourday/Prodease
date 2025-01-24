import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 bg-gray-800 text-white px-6">
      <div className="text-2xl font-bold">
        <Link to="/">ProdEase</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="text-lg">
          Inventory
        </Link>
        <Link to="/sales" className="text-lg">
          Sales
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
