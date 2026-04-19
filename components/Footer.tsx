"use client";

import { Coffee, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

type Props = {
  cartCount: number;
};

export default function Footer({ cartCount }: Props) {
  const router = useRouter();
  const orders = useCartStore((s) => s.orders);

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-between px-3 sm:px-4">

      <div
        onClick={() => router.push("/orders")}
        className="flex items-center gap-1.5 sm:gap-2 bg-[#6b4a3a] text-white px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md active:scale-95 transition"
      >
        <Coffee size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span className="text-xs sm:text-sm font-medium">
          My Brew
        </span>
        {cartCount > 0 && (
          <span className="bg-white text-[#2a1414] text-[9px] sm:text-[10px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>

      <div
        onClick={() => router.push("/order-history")}
        className="flex items-center gap-1.5 sm:gap-2 bg-white text-[#2a1414] px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md border border-[#e7ddd3] active:scale-95 transition"
      >
        <Receipt size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span className="text-xs sm:text-sm font-medium">
          Orders
        </span>
        {orders.length > 0 && (
          <span className="bg-[#2a1414] text-white text-[9px] sm:text-[10px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
            {orders.length}
          </span>
        )}
      </div>

    </div>
  );
}