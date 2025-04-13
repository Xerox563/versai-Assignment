import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import SummaryCard from "./SummaryCard";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

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

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 5.99;
  const tax = (subtotal - couponDiscount) * 0.08; // 8% tax rate
  const total = subtotal - couponDiscount + shipping + tax;

  // Handle coupon code validation
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
    setCouponError("");
    setCouponSuccess("");
  };

  const applyCoupon = () => {
    // Mock coupon validation logic - in a real app, this would be an API call
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    // Mock valid coupon codes
    const validCoupons = {
      SAVE10: 10,
      SAVE20: 20,
      FREESHIP: 5.99,
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      const discountAmount = validCoupons[couponCode.toUpperCase()];

      if (couponCode.toUpperCase() === "FREESHIP") {
        setCouponSuccess("Free shipping applied!");
        setCouponDiscount(discountAmount);
      } else {
        const discountValue = (subtotal * discountAmount) / 100;
        setCouponSuccess(`${discountAmount}% discount applied!`);
        setCouponDiscount(discountValue);
      }
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  // Handle form submission
  const handleCheckoutSubmit = (formData) => {
    // In a real app, this would send the form data and cart info to an API
    console.log("Order placed with data:", formData);
    console.log("Cart items:", cartItems);
    console.log("Order total:", total);

    // Redirect to order confirmation page (in a real app)
    alert("Order placed successfully!");
  };

  if (loading) {
    return (
      <div className="text-center p-8">Loading checkout information...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Coupon Code Section */}
          <div className="mb-6 p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Coupon Code</h2>
            <div className="flex">
              <input
                type="text"
                value={couponCode}
                onChange={handleCouponChange}
                placeholder="Enter coupon code"
                className="flex-grow p-2 border rounded-l"
              />
              <button
                onClick={applyCoupon}
                className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
            {couponSuccess && (
              <p className="text-green-600 mt-2">{couponSuccess}</p>
            )}
          </div>

          {/* Checkout Form */}
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        <div className="lg:col-span-1">
          <SummaryCard
            items={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            couponDiscount={couponDiscount}
          />

          <Link
            to="/cart"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
