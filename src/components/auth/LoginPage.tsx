"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

const DEMO = {
  email: "demo@realestate.com",
  password: "demo123",
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === DEMO.email && password === DEMO.password) {
        // Create session storage after successful login
        sessionStorage.setItem(
          "auth",
          JSON.stringify({
            isLoggedIn: true,
            email: email,
            loginAt: new Date().toISOString(),
          })
        );

        onLogin();
      } else {
        setError("The credentials provided do not match our records.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans selection:bg-gray-100">
      {/* LEFT SIDE: Visual/Brand (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a1a] items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-light text-white leading-tight">
            Curating the world's most{" "}
            <span className="italic">extraordinary</span> properties.
          </h2>
          <div className="mt-8 w-20 h-1 bg-white/20"></div>
        </div>
        {/* Subtle decorative circle */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/5 rounded-full"></div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-3 font-light">
              Enter your details to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-7 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-all placeholder:text-gray-300 font-light"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400">
                  Password
                </label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-7 pr-10 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-all placeholder:text-gray-300 font-light"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="cursor-pointer" />
                  ) : (
                    <Eye size={18} className="cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-[13px] text-red-500 bg-red-50/50 p-3 rounded border border-red-100 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-black text-white py-4 rounded-full font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:cursor-not-allowed group"
            >
              {loading ? (
                "AUTHENTICATING..."
              ) : (
                <>
                  SIGN IN{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform "
                  />
                </>
              )}
            </button>
          </form>

          {/* Demo Access Card */}
          <div className="mt-12 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Demo Access
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                  Email
                </p>
                <p className="text-gray-700 font-medium truncate">
                  demo@realestate.com
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                  Password
                </p>
                <p className="text-gray-700 font-medium">demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
