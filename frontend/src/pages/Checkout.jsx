import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useCart } from "../components/common/cartcontext/CartContext";
import PaymentForm from "../components/common/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 30 ? 0 : 5;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handlePayment = async () => {
    const response = await fetch("http://localhost:3000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const data = await response.json();
    setClientSecret(data.clientSecret);
  };

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartItems.length} />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h2>
            
            <div className="space-y-3 border-b border-gray-200 pb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-orange-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Payment</h2>
            
            {!clientSecret ? (
              <button
                onClick={handlePayment}
                className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
              >
                Continue to Payment
              </button>
            ) : (
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
