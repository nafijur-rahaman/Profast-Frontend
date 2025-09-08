import React, { useState } from "react";
import authimage from "../../assets/authImage.png"
export default function ParcelLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const err = {};
    if (!form.email.match(/^\S+@\S+\.\S+$/)) err.email = "Valid email required";
    if (!form.password) err.password = "Password is required";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      console.log("Logging in", form);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-slate-900 to-black text-slate-50 flex flex-col">


      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center justify-center p-6 pt-28">
        <div className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* LEFT - HERO IMAGE BIGGER */}
          <div className="relative flex items-center justify-center bg-gradient-to-tr from-indigo-700 via-fuchsia-700 to-rose-600 p-8">
            <div className="max-w-md z-10 text-center">
              <img
                src={authimage}
                alt="hero"
                className="mx-auto w-72 h-72 md:w-96 md:h-96 rounded-2xl object-cover shadow-2xl border-4 border-white/10"
              />

              <h4 className="mt-6 text-xl font-semibold text-white">Welcome Back</h4>
              <p className="mt-2 text-sm text-white/90">Log in to manage your deliveries and track parcels easily.</p>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 text-slate-900">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12h18M3 6h18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Parcelly Login</h3>
                <p className="text-sm text-slate-300">Access your account and track parcels instantly.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`mt-1 block w-full rounded-lg px-4 py-2 bg-white/5 border ${errors.email ? 'border-rose-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                />
                {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`mt-1 block w-full rounded-lg px-4 py-2 bg-white/5 border ${errors.password ? 'border-rose-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-amber-400`}
                />
                {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
              </div>

              <button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-400 to-rose-500 text-slate-900 font-semibold shadow hover:scale-[1.01] transform transition">
                {submitted ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-xs text-slate-400 text-center mt-2">Forgot password? <span className="text-amber-300 cursor-pointer">Reset here</span></p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
