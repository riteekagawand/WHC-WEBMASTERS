import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import { useCart } from '../context/cartContext';
import { FaRupeeSign } from 'react-icons/fa6';
import * as FaIcons from 'react-icons/fa';

const ViewCart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Cart</h1>
        </div>

        <div className="mt-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const Icon = FaIcons[item.icon as keyof typeof FaIcons] || FaIcons.FaQuestionCircle;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-lightpurp rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="text-[#634aff] text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-lg font-bold text-[#634aff] flex items-center">
                        <FaRupeeSign className="text-xl mr-1" /> {item.price}
                      </p>
                      <button
                        className="border border-gray-300 text-[#634aff] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-center mt-6">
                <button className="bg-[#634aff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5038cc] transition-all duration-200">
                  Proceed to Buy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCart;