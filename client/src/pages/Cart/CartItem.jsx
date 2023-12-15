import React from 'react';

const CartItem = ({ item, onRemove, onRemoveOneQuantity, onAddOneQuantity }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <p className="text-lg font-semibold mb-2">{item.name}</p>
            <p className="text-gray-700">Price: ${item.price}</p>
            <img src={item.productImage} alt={item.name} className="mt-2 rounded-md" />
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => onRemoveOneQuantity(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                    -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                    onClick={() => onAddOneQuantity(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                    +
                </button>
            </div>
            <button
                onClick={() => onRemove(item._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
