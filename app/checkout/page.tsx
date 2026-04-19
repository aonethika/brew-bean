"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

const STORAGE_KEY = "checkout_form";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");

  const nearbyPlaces = [
    "Ramanattukara",
    "Feroke",
    "Pantheerankavu",
    "Kozhikode City",
    "Kottakkal",
  ];

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const d = JSON.parse(saved);
      setName(d.name || "");
      setPhone(d.phone || "");
      setArea(d.area || "");
      setHouse(d.house || "");
      setStreet(d.street || "");
      setLandmark(d.landmark || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name, phone, area, house, street, landmark })
    );
  }, [name, phone, area, house, street, landmark]);

  const goToPayment = () => {
    if (!name || !phone || !area || !house || !street) {
      return;
    }
    router.push("/payment");
  };

  const input =
    "w-full bg-white/70 border border-[#e7ddd3] rounded-xl px-3 py-2 text-sm outline-none focus:bg-white focus:border-[#2a1414] transition";

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex justify-center px-3 py-6 text-[#2a1414]">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-[#e7ddd3] rounded-3xl shadow-lg p-4">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Delivery Details
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Quick secure checkout
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-2.5">

          {/* PERSONAL */}
          <div className="space-y-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name *" className={input} />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number *" className={input} />
          </div>

          {/* AREA */}
          <select value={area} onChange={(e) => setArea(e.target.value)} className={input}>
            <option value="">Select Area *</option>
            {nearbyPlaces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* ADDRESS BLOCK */}
          <div className="bg-[#f7f3ee] p-3 rounded-2xl space-y-2 border border-[#eee]">
            <input value={house} onChange={(e) => setHouse(e.target.value)} placeholder="House / Flat *" className={input} />
            <input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street / Road *" className={input} />
            <input value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Landmark (optional)" className={input} />
          </div>

          {/* TOTAL CARD */}
          <div className="bg-[#2a1414] text-white rounded-2xl p-3 flex justify-between items-center mt-2">
            <span className="text-xs opacity-70">Total</span>
            <span className="text-lg font-semibold">₹{total}</span>
          </div>

          {/* CTA */}
          <button
            onClick={goToPayment}
            className="w-full bg-[#2a1414] text-white py-2.5 rounded-xl text-sm font-medium
                       hover:bg-[#3a1d1d] active:scale-95 transition"
          >
            Continue to Payment
          </button>

          <p className="text-[11px] text-center text-gray-500">
            Auto-saved securely
          </p>

        </div>
      </div>
    </div>
  );
}