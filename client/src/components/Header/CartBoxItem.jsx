import React from 'react';
import { Link } from 'react-router-dom';

const CartBoxItem = ({ item, id, image, name, price, brand, quantity, onRemove, onRemoveOneQuantity, onAddOneQuantity }) => {
    return (
        <li key={id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={image}
                    alt="item"
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={id}>{name}</Link>
                        </h3>
                        <p className="ml-4">{price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{brand}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-black">Qty <button
                        onClick={() => onRemoveOneQuantity(item)}
                        className="px-2 py-1 text-grey-500"
                    >
                        -
                    </button >{quantity}<button
                        onClick={() => onAddOneQuantity(item)}
                        className="px-2 py-1 text-grey-500"
                    >
                            +
                        </button></p>

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => onRemove(item._id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartBoxItem