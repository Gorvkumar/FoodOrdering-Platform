import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={0} />

      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <div className="mb-6 text-6xl">✅</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mb-8 text-gray-600">
            Thank you for your order. Your food will be delivered soon.
          </p>
          
          <div className="space-y-3">
            <Link
              to="/orders"
              className="block w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
            >
              View Orders
            </Link>
            <Link
              to="/menu"
              className="block w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
