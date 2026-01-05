"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="max-w-5xl mx-auto p-5 mt-8">
      <h2 className="text-2xl font-bold mb-6">Owner Dashboard</h2>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === "products" ? "default" : "outline"}
          onClick={() => setActiveTab("products")}
        >
          Product Orders
        </Button>

        <Button
          variant={activeTab === "services" ? "default" : "outline"}
          onClick={() => setActiveTab("services")}
        >
          Service Bookings
        </Button>
      </div>

      {activeTab === "products" && <ProductOrders />}
      {activeTab === "services" && <ServiceBookings />}
    </div>
  );
}

/* ===========================
   PRODUCT ORDERS COMPONENT
   =========================== */

function ProductOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center mt-20 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  )
  return (
    <>
      {orders.length === 0 && <p>No product orders.</p>}

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 bg-white shadow">
          <p><b>Name:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.total_price}</p>

          <p className="font-semibold mt-2">Items:</p>
          {order.order_items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {order.status === "pending" && (
            <Button
              className="mt-3"
              onClick={() => updateStatus(order.id, "confirmed")}
            >
              Confirm Order
            </Button>
          )}
        </div>
      ))}
    </>
  );
}

/* ===========================
   SERVICE BOOKINGS COMPONENT
   =========================== */

function ServiceBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
  .from("service_bookings")
  .select(`
    id,
    client_name,
    client_mobile,
    hall_no,
    stall_no,
    status,
    created_at,
    profile_id,
    profiles (
      id,
      full_name,
      role,
      image1,
      contact_no,
      price_per_day
    )
  `)
  .order("created_at", { ascending: false });


    if (!error) setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase
      .from("service_bookings")
      .update({ status })
      .eq("id", id);

    fetchBookings();
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center mt-20 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
  return (
  <>
    {bookings.length === 0 && <p>No service bookings.</p>}

    {bookings.map((b) => (
      <div key={b.id} className="border rounded p-4 mb-4 bg-white shadow">
        <p><b>Client:</b> {b.client_name}</p>
        <p><b>Mobile:</b> {b.client_mobile}</p>
        <p><b>Hall:</b> {b.hall_no}</p>
        <p><b>Stall:</b> {b.stall_no}</p>

        <hr className="my-2" />

        {/* SERVICE PROFILE (UPDATED) */}
        <div className="flex items-center gap-3">
          <img
            src={b.profiles.image1 || "/placeholder.png"}
            alt={b.profiles.full_name}
            className="w-18 h-18 rounded-full object-cover border"
          />

          <div>
            <p className="font-semibold">{b.profiles.full_name}</p>
            <p className="text-sm text-gray-600">{b.profiles.contact_no}</p>
            <p className="text-sm text-gray-600">
              Price per day: ₹{b.profiles.price_per_day}
            </p>
            <p className="text-xs text-gray-400">
              Profile ID: {b.profile_id.slice(0, 8)}
            </p>
          </div>
        </div>

        <p className="mt-2">
          <b>Status:</b> {b.status}
        </p>

        {b.status === "pending" && (
          <Button
            className="mt-3"
            onClick={() => updateStatus(b.id, "confirmed")}
          >
            Confirm Booking
          </Button>
        )}
      </div>
    ))}
  </>
);
}