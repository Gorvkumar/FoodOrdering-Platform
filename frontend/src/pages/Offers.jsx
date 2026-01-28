import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const offers = [
    {
      id: 1,
      title: "50% OFF on First Order",
      description: "Get flat 50% discount on your first order above $20",
      code: "FIRST50",
      discount: "50%",
      validUntil: "Jan 31, 2026",
      category: "new-user",
      minOrder: "$20",
      image: "",
    },
    {
      id: 2,
      title: "Free Delivery",
      description: "Free delivery on all orders above $30",
      code: "FREEDEL",
      discount: "Free Delivery",
      validUntil: "Feb 15, 2026",
      category: "delivery",
      minOrder: "$30",
      image: "",
    },
    {
      id: 3,
      title: "Weekend Special",
      description: "30% off on all orders during weekends",
      code: "WEEKEND30",
      discount: "30%",
      validUntil: "Every Weekend",
      category: "special",
      minOrder: "$15",
      image: "",
    },
    {
      id: 4,
      title: "Combo Meal Deal",
      description: "Buy 2 meals and get 1 free dessert",
      code: "COMBO2+1",
      discount: "Free Dessert",
      validUntil: "Feb 28, 2026",
      category: "combo",
      minOrder: "$25",
      image: "",
    },
    {
      id: 5,
      title: "Student Discount",
      description: "20% off for students with valid ID",
      code: "STUDENT20",
      discount: "20%",
      validUntil: "Dec 31, 2026",
      category: "special",
      minOrder: "$10",
      image: "",
    },
    {
      id: 6,
      title: "Lunch Hour Deal",
      description: "25% off on orders between 12 PM - 3 PM",
      code: "LUNCH25",
      discount: "25%",
      validUntil: "Daily",
      category: "time-based",
      minOrder: "$12",
      image: "",
    },
  ];

  const categories = [
    { id: "all", name: "All Offers" },
    { id: "new-user", name: "New User" },
    { id: "delivery", name: "Delivery" },
    { id: "combo", name: "Combo Deals" },
    { id: "special", name: "Special" },
    { id: "time-based", name: "Time Based" },
  ];

  const filteredOffers =
    selectedCategory === "all"
      ? offers
      : offers.filter((offer) => offer.category === selectedCategory);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code ${code} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Special Offers
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Save more with our exclusive deals and discounts
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="absolute right-4 top-4 text-5xl opacity-10 transition-all group-hover:scale-110 group-hover:opacity-20">
                {offer.image}
              </div>

              <div className="relative">
                <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-bold text-orange-600">
                  {offer.discount}
                </div>

                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {offer.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {offer.description}
                </p>

                <div className="mb-4 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Min Order:</span>
                    <span>{offer.minOrder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Valid Until:</span>
                    <span>{offer.validUntil}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 px-4 py-2 text-center font-mono text-lg font-bold text-orange-600">
                    {offer.code}
                  </div>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="rounded-lg bg-orange-600 px-4 cursor-pointer py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                  >
                    Copy
                  </button>
                </div>

                <Link
                  to="/menu"
                  className="mt-4 block w-full rounded-lg bg-gray-900 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">
              No offers available in this category
            </p>
          </div>
        )}
      </div>

      <Footer />
      <Toaster/>
    </div>
  );
};

export default Offers;
