import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useCart } from "../components/common/cartcontext/CartContext";

const ExploreData = [
  {
    discount: "-20%",
    title: "Free Classic Offer",
    image:
      "https://plus.unsplash.com/premium_photo-1661767347165-a2fd8278671e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
  },
  {
    discount: "-55%",
    title: "Unique Taste",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
  },
  {
    discount: "-30%",
    title: "Explore Dishes",
    image:
      "https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
  },
];

const Menu = () => {
  const navigate = useNavigate();
  const [searchFood, setSearchFood] = useState("");
  const [debounceFood, setDebounceFood] = useState("");
  const [food, setfood] = useState([]);
  const [error, setError] = useState("");
  const [defaultfood, setDefaultFood] = useState([]);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFood(searchFood.trim());
    }, 500);

    return () => clearTimeout(timer);
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

      if (!data.meals) {
        setfood([]);
        setError("No food found");
      } else {
        setfood(data.meals.slice(0, 12));
        setError("");
      }
    };

    getfood();
  }, [debounceFood]);

  useEffect(() => {
    const fetchDefaultFood = async () => {
      try {
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=",
        );
        setDefaultFood(res.data.meals?.slice(0, 12) || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDefaultFood();
  }, []);

  const displayFood = searchFood.trim() === "" ? defaultfood : food;

  return (
    <div className="min-h-screen bg-gray-50">
<Navbar cartCount={cartItems.length} />

      <div className="relative h-64 overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 md:h-80">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide">
              I'm lovin' it
            </p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              McDonald's East London
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                4.5 Rating
              </div>
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                45 min delivery
              </div>
              <div className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                500+ items
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="text-2xl font-bold text-gray-900">
            All Offers & Menu
          </h2>

          <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <MdSearch className="text-2xl text-orange-600" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500">Search Food</p>
              <input
                value={searchFood}
                onChange={(e) => setSearchFood(e.target.value)}
                placeholder="Pizza, Biryani, Burger..."
                className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {ExploreData.map((item, index) => (
            <div
              key={index}
              className="group relative h-64 overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute right-4 top-4">
                <span className="rounded-full bg-orange-600 px-3 py-1 text-sm font-bold text-white shadow-lg">
                  {item.discount}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-400">
                  First Order Discount
                </p>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchFood ? `Results for "${searchFood}"` : "Popular Dishes"}
          </h2>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-8 text-center">
            <p className="text-lg font-semibold text-red-600">{error}</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayFood.map((meal) => (
            <div
              key={meal.idMeal}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
               
              </div>

              <div className="p-4">
                <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">
                  {meal.strMeal}
                </h3>
                <p className="mb-3 text-sm text-gray-500">{meal.strCategory}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">$20</span>
                  <button
                    onClick={() => {
                      addToCart({
                        id: meal.idMeal,
                        name: meal.strMeal,
                        category: meal.strCategory,
                        price: 23,
                        image: meal.strMealThumb,
                      });
                    }}
                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayFood.length === 0 && !error && (
          <div className="rounded-xl bg-gray-100 p-12 text-center">
            <p className="text-lg text-gray-500">Loading delicious food...</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
