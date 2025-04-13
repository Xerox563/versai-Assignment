import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import SummaryCard from "./SummaryCard";

const CartPage = () => {
  // Mock cart data - in a real app, this would come from a context or state management
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock API call to get cart items
  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchCartItems = () => {
      setTimeout(() => {
        const mockItems = [
          { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
          { id: 2, name: "Product 2", price: 49.99, quantity: 1 },
          { id: 3, name: "Product 3", price: 19.99, quantity: 3 },
        ];
        setCartItems(mockItems);
        setLoading(false);
      }, 500);
    };

    fetchCartItems();
  }, []);

  // Update quantity
  const handleUpdateQuantity = (itemId, newQuantity) => {
    // In a real app, you would call an API to update the quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    // In a real app, you would call an API to remove the item
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  if (loading) {
    return <div className="text-center p-8">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="text-center p-8 border rounded">
          <p className="mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <SummaryCard
            items={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            couponDiscount={0}
          />

          <Link
            to="/checkout"
            className="mt-4 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
