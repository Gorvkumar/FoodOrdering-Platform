import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext/CartContext";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else {
      clearCart();
      navigate("/payment-success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      
      <button
        disabled={isLoading || !stripe || !elements}
        className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      
      {message && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {message}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
