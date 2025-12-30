"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CartDrawer({ open, onClose }) {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);

  // 🔒 Freeze background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 p-4 flex flex-col">
        <h3 className="text-lg font-bold mb-4">Your Cart</h3>

        <div className="flex-1 overflow-y-auto">
          {cart.map((item) => (
            <Card key={item.id} className="mb-2">
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {cart.length > 0 && (
          <>
            <p className="font-semibold text-right mt-2">
              Total: ₹{total}
            </p>

            <Button
              className="w-full mt-3"
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
            >
              Go to Checkout
            </Button>
          </>
        )}
      </div>
    </>
  );
}
