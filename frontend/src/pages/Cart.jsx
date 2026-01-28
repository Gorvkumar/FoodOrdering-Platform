import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../components/common/cartcontext/CartContext";

const Cart = () => {
  const {cartItems, updateQuantity, setCartItems, removeItem} = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const applyPromoCode = () => {
    if (promoCode === "FIRST50") {
      setAppliedPromo({ code: "FIRST50", discount: 0.5 });
    } else if (promoCode === "WEEKEND30") {
      setAppliedPromo({ code: "WEEKEND30", discount: 0.3 });
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const deliveryFee = subtotal > 30 ? 0 : 5;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartItems.length} />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mb-4 text-6xl">🛒</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Your cart is empty
            </h3>
            <p className="mb-6 text-gray-600">Add items</p>
            <Link
              to="/menu"
              className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-6"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 text-4xl">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="mt-1 text-lg font-semibold text-orange-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Apply Promo Code
                </h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-orange-600 focus:outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="rounded-lg bg-orange-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-green-50 p-3">
                    <span className="text-sm font-semibold text-green-900">
                      {appliedPromo.code} applied!
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Order Summary
                </h3>

                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">
                        Discount ({appliedPromo.code})
                      </span>
                      <span className="font-semibold text-green-600">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold text-gray-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {subtotal < 30 && deliveryFee > 0 && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-3 text-center text-xs text-blue-900">
                    Add ${(30 - subtotal).toFixed(2)} more for free delivery!
                  </div>
                )}

                <button className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition-colors hover:bg-orange-700">
                  Proceed to Checkout
                </button>

                <Link
                  to="/menu"
                  className="mt-3 block w-full rounded-lg border border-gray-300 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
