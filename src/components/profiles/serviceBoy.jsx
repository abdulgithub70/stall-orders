"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ServiceBoyCard({ profile }) {
  const router = useRouter();

  const images = [
    profile.image1,
    profile.image2,
    profile.image3,
    profile.image4,
    profile.image5,
  ].filter(Boolean);

  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* CAROUSEL */}
      <div className="relative w-full h-70">
        <Image
          src={images[current] || "/placeholder.png"}
          alt={profile.full_name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-6 mt-3 bg-gray-500/30 py-1 ml-4 mr-4 rounded-full ">
          <button
            onClick={() =>
              setCurrent(current === 0 ? images.length - 1 : current - 1)
            }
            className=" left-3 bg-gray-200 rounded-full"
          >
            ◀
          </button>

          <button
            onClick={() =>
              setCurrent(current === images.length - 1 ? 0 : current + 1)
            }
            className="ml-35 bg-gray-200 rounded-full"
          >
            ▶
          </button>
        </div>
      )}

      {/* DETAILS */}
      <h3 className="text-lg font-semibold mt-4">
        {profile.full_name}
      </h3>

      <p className="text-sm text-gray-600">{profile.bio}</p>

      <p className="text-sm mt-2 font-medium">
        ₹ {profile.price_per_day} / day
      </p>

      {/* BOOK BUTTON */}
      <button
        onClick={() =>
          router.push(`/checkout?profileId=${profile.id}`)
        }
        className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
      >
        Book for Reception
      </button>
    </div>
  );
}
