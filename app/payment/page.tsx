"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = () => {
    if (cart.length === 0) return;

    setLoading(true);

    setTimeout(() => {
      clearCart();
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 1400);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-4 text-[#2a1414]">

      {/* LOADING */}
      {loading && (
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">☕</div>
          <h1 className="text-lg font-semibold">Placing order...</h1>
          <p className="text-xs text-gray-500 mt-1">Brewing your coffee</p>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white/90 border border-white/40 shadow-2xl rounded-3xl p-5 text-center w-full max-w-xs">

            <div className="text-5xl mb-2">☕</div>

            <h1 className="text-xl font-semibold">
              Order Placed
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              Your coffee is on the way
            </p>

            <p className="text-[11px] text-gray-400 mt-3">
              Redirecting home...
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-5 w-full bg-[#2a1414] text-white py-2.5 rounded-xl text-sm
                         hover:bg-[#3a1d1d] active:scale-95 transition"
            >
              Go Home
            </button>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      {!loading && !success && (
        <div className="w-full max-w-xs bg-white/80 backdrop-blur-xl border border-[#e7ddd3] shadow-lg rounded-3xl p-5 text-center">

          <h1 className="text-lg font-semibold mb-1">
            Confirm Order
          </h1>

          <p className="text-xs text-gray-500 mb-4">
            Final step before brewing
          </p>

          {/* TOTAL */}
          <div className="bg-[#2a1414] text-white rounded-2xl py-4 mb-5">
            <p className="text-xs opacity-70">Total Amount</p>
            <p className="text-2xl font-bold mt-1">₹{total}</p>
          </div>

          {/* BUTTON */}
          <button
            onClick={placeOrder}
            disabled={cart.length === 0}
            className="w-full bg-[#2a1414] text-white py-2.5 rounded-xl text-sm font-medium
                       hover:bg-[#3a1d1d] active:scale-95 transition disabled:opacity-50"
          >
            Place Order ☕
          </button>

          <p className="text-[11px] text-gray-400 mt-3">
            Secure demo checkout
          </p>

        </div>
      )}

    </div>
  );
}