import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../authContext/AuthContext";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}) {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, register } = useAuth();

  const modalRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError("");
      setLoading(false);

      setTimeout(() => {
        emailRef?.current?.focus();
      }, 50);
    }
  }, [isOpen, initialMode]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // click outside to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  const title = useMemo(() => {
    return mode === "login" ? "Welcome back" : "Create an account";
  }, [mode]);

  const subTitle = useMemo(() => {
    return mode === "login"
      ? "Log in to continue ordering delicious food."
      : "Sign up to start ordering food in seconds.";
  }, [mode]);

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!password.trim()) return "Password is required.";

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailValid) return "Please enter a valid email.";

    if (mode === "register") {
      if (!fullName.trim()) return "Full name is required.";
      if (password.length < 6) return "Password must be at least 6 characters.";
    }
    return "";
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        console.log("Login Success");
        alert("Login Success ✅");
      } else {
        await register(fullName, email, password);
        console.log("Register Success");
        alert("Register Success ✅");
      }

      resetForm();
      onClose?.();
    } catch (err) {
      console.log("Auth Error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 backdrop-blur-sm px-4"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-black/5 overflow-hidden animate-[popIn_.18s_ease-out]"
      >
        {/* header */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-orange-50 to-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-black/5 transition"
            aria-label="Close"
          >
            <IoClose size={22} />
          </button>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{subTitle}</p>
          </div>

          {/* mode switch */}
          <div className="mt-4 flex gap-2 rounded-full bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2">
          {error ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="fullname"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter email"
                type="email"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="mt-2 relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 pr-12 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/5 transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {mode === "login" ? (
                <div className="mt-2 flex items-center justify-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Forgot password?
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  Password should be at least 6 characters for better security.
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className={`w-full rounded-2xl py-3 font-semibold transition ${
                loading
                  ? "bg-orange-300 cursor-not-allowed text-white"
                  : "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200"
              }`}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Create Account"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* social login UI only */}
            <button
              type="button"
              className="w-full rounded-2xl border border-gray-200 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>

            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <span className="font-semibold text-gray-700 cursor-pointer">
                Terms
              </span>{" "}
              &{" "}
              <span className="font-semibold text-gray-700 cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </form>
      </div>

      {/* animation */}
      <style>{`
        @keyframes popIn {
          from { transform: scale(.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
