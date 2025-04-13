import { useState } from "react";

const CartItem = ({ item, onUpdate, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdate(item.id, newQuantity);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://www.bigbasket.com/media/uploads/p/l/40164545_12-glucon-d-nimbu-pani-flavoured-glucose-based-beverage-mix.jpg"
          alt={item.name}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center">
        <label htmlFor={`quantity-${item.id}`} className="sr-only">
          Quantity
        </label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 border rounded p-2 mr-4 text-center"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
