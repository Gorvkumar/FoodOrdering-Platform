import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaTelegram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-lg font-bold text-white">
                Q/B
              </div>
              <span className="text-2xl font-bold text-gray-900">QuickBite</span>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Delicious food delivered fast to your doorstep. Order now and enjoy fresh meals from your favorite restaurants.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-all hover:bg-orange-600 hover:text-white">
                <BsInstagram className="text-lg" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-all hover:bg-orange-600 hover:text-white">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-all hover:bg-orange-600 hover:text-white">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-all hover:bg-orange-600 hover:text-white">
                <FaTelegram className="text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 transition-colors hover:text-orange-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-600 transition-colors hover:text-orange-600">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-600 transition-colors hover:text-orange-600">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 transition-colors hover:text-orange-600">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 transition-colors hover:text-orange-600">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 transition-colors hover:text-orange-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition-colors hover:text-orange-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition-colors hover:text-orange-600">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 transition-colors hover:text-orange-600">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li> support@quickbite.com</li>
              <li> +1 (555) 123-4567</li>
              <li> 123 Food Street, NY 10001</li> 
              <li className="pt-2">
                <span className="font-semibold text-gray-900">Hours:</span>
                <br />
                Mon-Sun: 9:00 AM - 11:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
          <p>&copy; 2026 QuickBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
