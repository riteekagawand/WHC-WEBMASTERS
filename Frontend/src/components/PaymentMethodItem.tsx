import React from 'react';
interface PaymentMethodItemProps {
  name: string;
  status: string;
  isDefault?: boolean;
  icon: React.ReactNode;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ name, status, isDefault, icon }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      <div className="flex items-center">
        {/* Payment Method Icon */}
        <div className="w-8 h-8 text-purple rounded-full flex items-center justify-center mr-3">
          {icon}
        </div>
        {/* Payment Method Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800">
            {name} {isDefault && <span className="text-xs text-gray-500">• Default</span>}
          </h4>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </div>
      {/* Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={status === 'Connected'} />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-all"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
      </label>
    </div>
  );
};

export default PaymentMethodItem;