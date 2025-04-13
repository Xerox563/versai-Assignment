import { Routes, Route } from "react-router-dom";
import CartPage from "./components/client/Cart/CartPage";
import CheckoutPage from "./components/client/Cart/CheckoutPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Online Store</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Amit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
