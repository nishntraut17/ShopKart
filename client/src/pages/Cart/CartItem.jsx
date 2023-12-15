import React from 'react';

const CartItem = ({ item, onRemove, onRemoveOneQuantity, onAddOneQuantity }) => {
    return (
        <div>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => onRemove(item.id)}>Remove</button>
            <br />
            <button onClick={() => onRemoveOneQuantity(item)}>-</button>
            <br />
            <button onClick={() => onAddOneQuantity(item)}>+</button>
        </div>
    );
};

export default CartItem;
