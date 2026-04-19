"use client";

import { useCartStore } from "@/store/cart";
import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const orders = useCartStore((s) => s.orders);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const handleReorder = (items: any[]) => {
    items.forEach((item) => {
      for (let i = 0; i < item.qty; i++) {
        addItem(item);
      }
    });

    router.push("/orders"); // go to cart page
  };

  return (
            <div className="min-h-screen items-center bg-[#f7f3ee] px-4 py-8 text-[#2a1414]">
               <div className="flex justify-center mb-5">
            <div
                onClick={() => router.push("/")}
                className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-full shadow text-sm font-medium active:scale-95 transition"
            >
                <Coffee size={18} />
                Back
            </div>
            </div>
      {/* HEADER */}
      <div className="max-w-md mx-auto">

        <h1 className="text-2xl font-bold mb-6 text-center">
          My Orders ☕
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">
            No orders yet
          </p>
        ) : (
          <div className="flex flex-col gap-4">

            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-4"
              >
                {/* DATE */}
                <p className="text-xs text-gray-400">
                  {new Date(order.date).toLocaleString()}
                </p>

                {/* ITEMS PREVIEW */}
                <div className="mt-2 text-sm text-gray-700">
                  {order.items.slice(0, 2).map((item: any) => (
                    <p key={item.id}>
                      {item.name} × {item.qty}
                    </p>
                  ))}

                  {order.items.length > 2 && (
                    <p className="text-xs text-gray-400">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center mt-3">

                  <p className="font-semibold">
                    ₹{order.total}
                  </p>

                  {/* REORDER */}
                  <button
                    onClick={() => handleReorder(order.items)}
                    className="text-sm bg-[#2a1414] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a1d1d] transition"
                  >
                    Reorder
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}