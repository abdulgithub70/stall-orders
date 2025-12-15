"use client";

import { Button } from "@/components/ui/button";

export default function CartItem({ item }) {
  return (
    <div className="border rounded p-2 mb-2 flex justify-between items-center">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-600">
          ₹{item.price} x {item.quantity}
        </p>
      </div>
      <p className="font-semibold">₹{item.price * item.quantity}</p>
    </div>
  );
}
