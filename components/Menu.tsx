"use client";

import { useState } from "react";
import Drip from "./Drip";
import Footer from "./Footer";
import { menuItems, MenuItem } from "@/data/menu";
import { useCartStore } from "@/store/cart";

export default function Menu({
  phase,
}: {
  phase: "intro" | "menu";
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const cart = useCartStore((s) => s.cart);
  const addItem = useCartStore((s) => s.addItem);

  const addToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      className={`fixed inset-0 bg-[#f7f3ee] flex flex-col items-center justify-start transition-opacity duration-500 ${
        phase === "menu"
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      } overflow-y-auto`}
    >
      {/* DRIP */}
      <div className="w-full relative">
        <Drip active={phase === "menu"} />
      </div>

      {/* HEADER */}
      <div className="flex flex-col items-center z-10 text-center w-full px-4">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2a1414] tracking-wide mt-2">
          BREW BEAN
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 mt-13 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24 w-full max-w-5xl">

          {menuItems.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                onClick={() =>
                  setOpenId(isOpen ? null : item.id)
                }
                className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:scale-[1.02] transition"
              >
                <div className="w-full h-32 flex items-center justify-center bg-white p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-auto object-contain"
                  />
                </div>

                <div className="p-3 flex flex-col items-center gap-1">

                  <h2 className="text-base font-semibold text-[#2a1414]">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    ₹{item.price}
                  </p>

                  {isOpen && (
                    <p className="text-xs text-gray-500 mt-2">
                      {item.desc}
                    </p>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="mt-2 bg-[#2a1414] text-white text-sm px-3 py-1.5 rounded-lg w-full hover:bg-[#6b4a3a] transition"
                  >
                    Add
                  </button>

                </div>
              </div>
            );
          })}

        </div>
      </div>

      <Footer cartCount={cartCount} />
    </div>
  );
}