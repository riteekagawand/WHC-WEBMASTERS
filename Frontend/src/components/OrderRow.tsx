import React from 'react';
import { MdOutlineEventNote } from "react-icons/md";

interface OrderRowProps {
  orderNumber: string;
  customer: string;
  amount: string;
  date: string;
  status: string;
}

const OrderRow: React.FC<OrderRowProps> = ({ orderNumber, customer, amount, date, status }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 px-4 text-gray-600 flex items-center">
        <span className="mr-2"><MdOutlineEventNote /></span> {orderNumber}
      </td>
      <td className="py-3 px-4 text-gray-600">{customer}</td>
      <td className="py-3 px-4 text-gray-600">{amount}</td>
      <td className="py-3 px-4 text-gray-600">{date}</td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === 'Shipped'
              ? 'bg-green-100 text-green-600'
              : status === 'Delivered'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default OrderRow;