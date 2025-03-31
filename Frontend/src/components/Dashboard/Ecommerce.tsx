import React from 'react';
import SummaryCard from '../SummaryCard';
import OrderRow from '../OrderRow';
import ProductItem from '../ProductItem';
import PaymentMethodItem from '../PaymentMethodItem';
import { FaBox, FaShoppingCart, FaUsers, FaCreditCard, FaPaypal, FaPlus } from 'react-icons/fa';
import { BsCashStack } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";


const EcommerceDashboard: React.FC = () => {
  const summaryData = [
    { title: 'Products', value: '24 active listings', buttonText: 'Add Product', icon: FaBox },
    { title: 'Orders', value: '12 pending orders', buttonText: 'View All', icon: FaShoppingCart },
    { title: 'Revenue', value: '$1,245 this month', buttonText: 'View Report', icon: BsCashCoin },
    { title: 'Customers', value: '89 total customers', buttonText: 'View List', icon: FaUsers },
  ];

  const recentOrders = [
    { orderNumber: '#ORD-2458', customer: 'Sarah Miller', amount: '$129.99', date: 'May 15, 2023', status: 'Shipped' },
    { orderNumber: '#ORD-2457', customer: 'John Davis', amount: '$89.50', date: 'May 14, 2023', status: 'Processing' },
    { orderNumber: '#ORD-2456', customer: 'Emma Wilson', amount: '$245.00', date: 'May 13, 2023', status: 'Delivered' },
    { orderNumber: '#ORD-2455', customer: 'Michael Brown', amount: '$67.25', date: 'May 12, 2023', status: 'Processing' },
    { orderNumber: '#ORD-2454', customer: 'Jessica Taylor', amount: '$189.99', date: 'May 11, 2023', status: 'Delivered' },
  ];

  const topProducts = [
    { name: 'Handmade Ceramic Mug', sales: '24 sold', price: '$18.99', image: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg' },
    { name: 'Organic Cotton T-shirt', sales: '18 sold', price: '$29.99', image: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg' },
    { name: 'Handcrafted Jewelry Box', sales: '15 sold', price: '$45.00', image: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg' },
    { name: 'Natural Soy Candle', sales: '12 sold', price: '$22.50', image: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg' },
  ];

  const paymentMethods = [
    { name: 'Stripe', status: 'Connected', isDefault: true, icon: <FaCreditCard className="text-purple-600 text-lg" /> },
    { name: 'PayPal', status: 'Connected', isDefault: false, icon: <FaPaypal className="text-purple-600 text-lg" /> },
    { name: 'Square', status: 'Not connected', isDefault: false, icon: <BsCashStack className="text-purple-600 text-lg" /> },
  ];

  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">E-commerce Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button className="text-gray-600 font-semibold border-b-2 border-purple-600 pb-2">
          Overview
        </button>
        <button className="text-gray-600">Products</button>
        <button className="text-gray-600">Orders</button>
        <button className="text-gray-600">Payments</button>
        <button className="text-gray-600">Settings</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {summaryData.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            buttonText={item.buttonText}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full border border-lightpurp">
            <thead>
              <tr className="bg-lightpurp text-gray-600 text-sm">
                <th className="py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <OrderRow
                  key={order.orderNumber}
                  orderNumber={order.orderNumber}
                  customer={order.customer}
                  amount={order.amount}
                  date={order.date}
                  status={order.status}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-purple text-black px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
            View All Orders
          </button>
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Products</h2>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          {topProducts.map((product) => (
            <ProductItem
              key={product.name}
              name={product.name}
              sales={product.sales}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
        <div className="mt-4">
          <button className="bg-purple text-black px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
            View All Products
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Methods</h2>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          {paymentMethods.map((method) => (
            <PaymentMethodItem
              key={method.name}
              name={method.name}
              status={method.status}
              isDefault={method.isDefault}
              icon={method.icon}
            />
          ))}
          {/* Add Button */}
          <div className="flex justify-center mt-4">
            <button className="text-purple font-medium flex items-center">
              <FaPlus className="mr-2" /> Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;