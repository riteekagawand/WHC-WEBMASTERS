import React from 'react';

interface ProductItemProps {
  name: string;
  sales: string;
  price: string;
  image: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, sales, price, image }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      <div className="flex items-center">
        {/* Product Image */}
        <img src={image} alt={name} className="w-10 h-10 rounded-full mr-3" />
        {/* Product Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{sales} • {price}</p>
        </div>
      </div>
      {/* More Options Icon */}
      <button className="text-gray-500 hover:text-gray-700">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>
  );
};

export default ProductItem;