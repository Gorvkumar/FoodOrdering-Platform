import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useAuth } from "../components/authContext/AuthContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { user, isLoggedIn, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("ongoing");

  

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="rounded-2xl bg-white p-12 shadow-sm">
            <div className="mb-4 text-6xl">🔒</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Login Required
            </h2>
            <p className="mb-6 text-gray-600">
              Please login to view your orders
            </p>
            <Link
              to="/"
              className="inline-block rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Go to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const orders = [
    {
      id: "001",
      date: "Jan 25, 2026",
      time: "2:30 PM",
      status: "ongoing",
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 24.0 },
        { name: "Garlic Bread", quantity: 1, price: 6.0 },
      ],
      total: 30.0,
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      estimatedDelivery: "3:15 PM",
      trackingSteps: [
        { label: "Order Placed", completed: true },
        { label: "Preparing", completed: true },
        { label: "Out for Delivery", completed: false },
        { label: "Delivered", completed: false },
      ],
    },
    {
      id: "002",
      date: "Jan 24, 2026",
      time: "7:45 PM",
      status: "completed",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 12.0 },
        { name: "French Fries", quantity: 2, price: 8.0 },
        { name: "Coke", quantity: 2, price: 4.0 },
      ],
      total: 24.0,
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      deliveredAt: "8:20 PM",
    },
    {
      id: "003",
      date: "Jan 23, 2026",
      time: "1:15 PM",
      status: "completed",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 10.0 },
        { name: "Grilled Chicken", quantity: 1, price: 15.0 },
      ],
      total: 25.0,
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      deliveredAt: "1:50 PM",
    },
    {
      id: "004",
      date: "Jan 22, 2026",
      time: "6:00 PM",
      status: "cancelled",
      items: [{ name: "Pasta Carbonara", quantity: 1, price: 14.0 }],
      total: 14.0,
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      cancelledReason: "Customer requested cancellation",
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            Track and manage your food orders
          </p>
        </div>

        <div className="mb-6 flex gap-3 border-b border-gray-200">
          {["ongoing", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="mb-4 text-6xl">📦</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No {activeTab} orders
              </h3>
              <p className="text-gray-600">
                You don't have any {activeTab} orders at the moment
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {order.id}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {order.date} at {order.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {order.status === "ongoing" && order.trackingSteps && (
                    <div className="mb-6">
                      <h4 className="mb-4 text-sm font-semibold text-gray-900">
                        Order Tracking
                      </h4>
                      <div className="flex items-center justify-between">
                        {order.trackingSteps.map((step, index) => (
                          <div key={index} className="flex flex-1 items-center">
                            <div className="flex flex-col items-center">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  step.completed
                                    ? "bg-orange-600 text-white"
                                    : "bg-gray-200 text-gray-400"
                                }`}
                              >
                                {step.completed ? "✓" : index + 1}
                              </div>
                              <p
                                className={`mt-2 text-xs font-medium ${
                                  step.completed
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                            {index < order.trackingSteps.length - 1 && (
                              <div
                                className={`h-1 flex-1 ${
                                  step.completed ? "bg-orange-600" : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-lg bg-blue-50 p-3 text-center">
                        <p className="text-sm font-semibold text-blue-900">
                          Estimated Delivery: {order.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="mb-3 text-sm font-semibold text-gray-900">
                      Order Items
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                              {item.quantity}x
                            </span>
                            <span className="font-medium text-gray-900">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-900">
                      Delivery Address
                    </h4>
                    <p className="text-sm text-gray-600">
                      {order.deliveryAddress}
                    </p>
                  </div>

                  {order.status === "completed" && (
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                      <p className="text-sm font-semibold text-green-900">
                        Delivered at {order.deliveredAt}
                      </p>
                    </div>
                  )}

                  {order.status === "cancelled" && (
                    <div className="rounded-lg bg-red-50 p-3">
                      <p className="text-sm font-semibold text-red-900">
                        Cancelled
                      </p>
                      <p className="mt-1 text-xs text-red-700">
                        {order.cancelledReason}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-3">
                    {order.status === "completed" && (
                      <button className="flex-1 rounded-lg bg-orange-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700">
                        Reorder
                      </button>
                    )}
                    <button className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
