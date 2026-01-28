import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../common/authModel/AuthModal";
import { useAuth } from "../authContext/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Offers", path: "/offers" },
  { name: "Orders", path: "/orders" },
];

export default function Navbar({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const { user, isLoggedIn, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  const activeClass =
    "text-orange-600 after:scale-x-100 after:opacity-100 font-semibold";
  const baseClass =
    "relative text-gray-700 hover:text-orange-600 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:opacity-0 after:bg-orange-600 after:transition-all";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-white font-bold">
              Q/B
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">QuickBite</p>
              <p className="text-xs text-gray-500 -mt-1">
                Order fast • Eat fresh
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {location.pathname === "/" ? (
              ""
            ) : (
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
              >
                <span className="hidden md:block">Cart</span>
                <span className="md:hidden">🛒</span>

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-orange-600 px-1 text-xs font-semibold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}

            {!isLoggedIn ? (
              <div className="hidden items-center gap-2 md:flex">
                <button
                  onClick={() => openAuth("login")}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuth("register")}
                  className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-xl border cursor-pointer border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {String(user?.fullName?.[0] || "U").toUpperCase()}
                  </div>
                  <div className="max-w-[140px] truncate text-left">
                    {user?.fullName || "User"}
                  </div>
                  
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-sm font-semibold ${
                        isActive
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="h-px bg-gray-100" />

                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openAuth("login")}
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openAuth("register")}
                      className="flex-1 rounded-xl bg-orange-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-orange-700"
                    >
                      Register
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
