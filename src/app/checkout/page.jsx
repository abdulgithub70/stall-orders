"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    hall_no: "",
    stall_name: "",
    stall_number: "",
  });

  const [loading, setLoading] = useState(false);

  // Total price calculation
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill in your name and phone number!");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.from("orders").insert([
      {
        ...form,
        order_items: cart,
        total_price: totalPrice,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Order failed ❌");
    } else {
      alert("Order placed successfully ✅");
      clearCart();
      router.push("/"); // redirect to home or thank you page
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Checkout</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="hall_no"
          placeholder="Hall No."
          value={form.hall_no}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="stall_name"
          placeholder="Stall Name"
          value={form.stall_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="stall_number"
          placeholder="Stall Number"
          value={form.stall_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mt-5">
        <p className="text-right font-semibold mb-3">
          Total: ₹{totalPrice}
        </p>

        <Button
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
