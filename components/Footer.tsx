"use client";

import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  cartCount: number;
};

export default function Footer({ cartCount }: Props) {
  const router = useRouter();

  return (
 <div className="fixed bottom-4 right-4 z-50">
  <div
    onClick={() => router.push("/orders")}
    className="shadow-lg px-5 py-3 bg-[#6b4a3a] rounded-full flex items-center gap-2 cursor-pointer hover:scale-105 transition"
  >
    <Coffee size={18} className="text-white" />

    <span className="text-sm font-medium text-white">
      My Brew
    </span>

    {/* BADGE */}
    {cartCount > 0 && (
      <span className="bg-white text-[#2a1414] text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
        {cartCount}
      </span>
    )}
  </div>
</div>
  );
}