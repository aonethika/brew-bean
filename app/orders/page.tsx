"use client";

import { useRouter } from "next/navigation";
import { Coffee, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function OrdersPage() {
  const router = useRouter();

  const cart = useCartStore((s) => s.cart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const goToCheckout = () => {
    if (cart.length === 0) return;
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col items-center px-3 py-6 text-[#2a1414]">

      {/* TOP */}
      <div
       
            onClick={() => router.push("/")}
            className="flex items-center gap-2 mb-5 cursor-pointer bg-white px-3 py-1.5 rounded-full shadow-sm text-sm
                        hover:shadow-md hover:scale-[1.02] active:scale-95 transition"
            >
        <Coffee size={16} />
        Back
      </div>

      <h1 className="text-xl font-bold mb-4">Your Order</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center mt-10 text-gray-500 text-sm">
          <ShoppingBag size={28} className="mb-2 opacity-60" />
          No items
        </div>
      ) : (
        <div className="w-full max-w-sm flex flex-col gap-3">

          {/* ITEMS */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-3 flex justify-between items-center"
            >
              <div>
                <h2 className="font-medium text-sm">{item.name}</h2>

                <div className="flex items-center gap-2 mt-2 bg-[#f7f3ee] px-2 py-1 rounded-full w-fit">
                 <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-1 rounded-full hover:bg-white active:scale-90 transition"
                    >
                    <Minus size={14} />
                    </button>

                    <button
                    onClick={() => increaseQty(item.id)}
                    className="p-1 rounded-full hover:bg-white active:scale-90 transition"
                    >
                    <Plus size={14} />
                    </button>
                </div>
              </div>

              <p className="font-semibold text-sm">
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}

          {/* TOTAL */}
          <div className="bg-white rounded-xl p-3 flex justify-between text-sm font-semibold shadow-sm">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={goToCheckout}
            className="bg-[#2a1414] text-white py-2.5 rounded-xl text-sm
                        hover:bg-[#3a1d1d] hover:shadow-md
                        active:scale-95 transition"
            >
            Checkout
            </button>

        </div>
      )}
    </div>
  );
}