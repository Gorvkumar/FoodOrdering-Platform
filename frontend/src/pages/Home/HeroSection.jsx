import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import axios from "axios";

import heroImg from "../../assets/homeImgs/foodhero.svg";
import { FaLocationDot } from "react-icons/fa6";
import ImgSlider from "./ImgSlider";


export default function HeroSection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("New Delhi");
  const [btn, setBtn] = useState(true);
  const [searchFood, setSearchFood] = useState("");
  const [debounceFood, setDebounceFood] = useState("");
  const [food, setfood] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFood(searchFood.trim());
    }, 500);

    return ()=> clearInterval(timer)

  }, [searchFood]);

  useEffect(() => {
    const getfood = async () => {
      if (!debounceFood) {
        setfood([]);
        setError("");
        return;
      }

      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${debounceFood}`;
      const res = await axios.get(url);
      const data = res.data;
      console.log("data", data);

      if (!data.meals) {
        setfood([]);
        setError("food not found");
      } else {
        setfood(data.meals.slice(0, 4));
      }
    };

    getfood();
  }, [debounceFood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return navigate("/menu");
    navigate(
      `/menu?search=${encodeURIComponent(q)}&loc=${encodeURIComponent(location)}`,
    );
  };

  const handleSearchClick = () => {
    setBtn(!btn);
  };

  const Indicators = [
    {
      title: "4.5 Rating ",
      description: "1L + Reviews",
    },
    {
      title: "45 min",
      description: "Avg Delivery",
    },
    {
      title: "500+ Restaurants ",
      description: "Near By You",
    },
  ];

  const handleSearch = (e) => {
    setSearchFood(e.target.value);
    console.log(e.target.value);

    console.log(searchFood);
  };

  // img slider

  

  return (
    <section className="relative bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute right-[-160px] top-[120px] h-[420px] w-[420px] rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-180px] h-[520px] w-[520px] rounded-full bg-amber-100/50 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-white"></span>
            New: Flat 40% off on first order
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-gray-900 md:text-5xl">
            Delicious food,
            <br />
            <span className="text-orange-600">delivered to your door</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            Discover restaurants near you, order in seconds, and track delivery
            live. Built for speed, simplicity, and cravings.
          </p>

          {/* Search Card */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 rounded-3xl border border-gray-100 bg-white p-4 shadow-lg shadow-orange-100/40"
          >
            {/* Location */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-orange-700 shadow-sm">
                  <FaLocationDot />
                </div>
                <div className="w-full">
                  <p className="text-xs font-semibold text-gray-500">
                    Delivery Location
                  </p>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city / area"
                    className="w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

        
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleSearchClick}
                type="submit"
                className="rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                Search & Order
              </button>

              {btn === true && (
                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
                >
                  Browse Menu
                </button>
              )}
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {Indicators.map((ele, key) => {
              return (
                <TrustPill
                  key={key}
                  title={ele.title}
                  subtitle={ele.description}
                />
              );
            })}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative mx-auto max-w-md">
            {/* glow */}
            <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-orange-200/50 via-yellow-200/30 to-transparent blur-2xl" />

            {/* image card */}
            <div className="overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-2xl">
              <img
                src={heroImg}
                alt="Delicious food"
                className="h-[420px] w-full object-cover md:h-[520px]"
                loading="lazy"
              />
            </div>

            {/* floating cards */}
            <FloatingCard
              className="absolute -left-[115px] top-16"
              title="Live Order Tracking"
              subtitle="See delivery in real-time"
              value="ETA 18 min"
            />
            <FloatingCard
              className="absolute -right-[115px] bottom-14"
              title="Today’s Offer"
              subtitle="Extra discount available"
              value="UP TO 40% OFF"
              highlight
            />
          </div>
        </div>
      </div>
      
      
    </section>
  );
}

/* ---------------- Components ---------------- */

function TrustPill({ title, subtitle, key }) {
  return (
    <div
      className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
      key={key}
    >
      <p className="text-sm font-extrabold text-gray-900">{title}</p>
      <p className="text-xs font-semibold text-gray-500">{subtitle}</p>
    </div>
  );
}

function FloatingCard({ title, subtitle, value, className = "", highlight }) {
  return (
    <div
      className={`w-56 rounded-3xl border bg-white p-4 shadow-lg ${
        highlight ? "border-orange-200" : "border-gray-100"
      } ${className}`}
    >
      <p className="text-xs font-semibold text-gray-500">{title}</p>
      <p className="text-sm font-bold text-gray-900">{subtitle}</p>
      <div
        className={`mt-2 inline-flex rounded-2xl px-3 py-1 text-xs font-extrabold ${
          highlight ? "bg-orange-50 text-orange-700" : "bg-gray-900 text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
