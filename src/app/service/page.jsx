"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ServiceCheckout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profileId = searchParams.get("profileId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // CLIENT STATES
  const [clientName, setClientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [hallNo, setHallNo] = useState("");
  const [stallNo, setStallNo] = useState("");

  // FETCH PROFILE
  useEffect(() => {
    if (!profileId) return;

    fetch(
      `https://wcwklmxunkflyrbrxofk.supabase.co/rest/v1/profiles?id=eq.${profileId}&select=*`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data[0]);
        setLoading(false);
      });
  }, [profileId]);

  // BOOKING HANDLER
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!clientName || !mobile) {
      alert("Name & mobile are required");
      return;
    }

    setSubmitting(true);

    const res = await fetch(
      "https://wcwklmxunkflyrbrxofk.supabase.co/rest/v1/service_bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          client_name: clientName,
          client_mobile: mobile,
          hall_no: hallNo,
          stall_no: stallNo,
          profile_id: profile.id, // 🔑 ONLY IDENTITY
        }),
      }
    );

    setSubmitting(false);

    if (res.ok) {
      alert("✅ Booking Confirmed Our team will contact you soon! if you have any questions contact us at our contact page.");
      setClientName("");
      setMobile("");
      setHallNo("");
      setStallNo("");
    } else {
      alert("❌ Booking Failed");
    }
    router.push("/");
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center mt-35 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
    )
  }

  if (!profile) {
    return <p className="text-center mt-20">Profile not found</p>;
  }
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* PROFILE CARD */}
      <div className="bg-white shadow rounded-lg p-4">
        <Image
          src={profile.image1 || "/placeholder.png"}
          alt={profile.full_name}
          width={400}
          height={300}
          className="rounded-lg object-cover w-full h-72"
        />

        <h2 className="text-xl font-semibold mt-4">
          {profile.full_name}
        </h2>
        <p className="text-gray-600">{profile.bio}</p>
        <p className="text-sm mt-1 font-medium">
          Role: {profile.role}
        </p>
      </div>

      {/* CLIENT FORM */}
      <form
        onSubmit={handleBooking}
        className="bg-white shadow rounded-lg p-4 mt-6 space-y-4"
      >
        <h3 className="text-lg font-semibold">
          Client Details
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Hall Number"
          value={hallNo}
          onChange={(e) => setHallNo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Stall Number / Name"
          value={stallNo}
          onChange={(e) => setStallNo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-60"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
