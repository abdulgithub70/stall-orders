"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Status update failed ❌");
    } else {
      alert("Status updated ✅");
      fetchOrders(); // refresh orders
    }
  };

  if (loading) return <p className="p-5">Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Owner Dashboard - Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded p-4 mb-4 bg-white shadow"
        >
          <div className="mb-3">
            <p>
              <span className="font-semibold">Name:</span> {order.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone}
            </p>
            <p>
              <span className="font-semibold">Hall No:</span> {order.hall_no}
            </p>
            <p>
              <span className="font-semibold">Stall Name:</span>{" "}
              {order.stall_name}
            </p>
            <p>
              <span className="font-semibold">Stall Number:</span>{" "}
              {order.stall_number}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {order.status}
            </p>
            <p>
              <span className="font-semibold">Total:</span> ₹{order.total_price}
            </p>
          </div>

          <div className="mb-3">
            <p className="font-semibold mb-1">Order Items:</p>
            {order.order_items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {order.status === "pending" && (
            <Button onClick={() => updateStatus(order.id, "confirmed")}>
              Confirm Order
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
