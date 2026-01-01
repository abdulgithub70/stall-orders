"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";


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
      <div className="relative w-full h-80">
        <Image
          src={images[current] || "/placeholder.png"}
          alt={profile.full_name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-x-30 p-0 bg-gray-300/40 py-1 mt-1 ml-8 mr-8 rounded-full">
          <button
            onClick={() =>
              setCurrent(current === 0 ? images.length - 1 : current - 1)
            }
            className=" rounded-full m-0 hover:bg-gray-300 transition"
          >
            <ChevronLeft className="m-0" size={21} />
          </button>
            
          <button
            onClick={() =>
              setCurrent(current === images.length - 1 ? 0 : current + 1)
            }
            className=" rounded-full m-0 hover:bg-gray-300 transition"
          >
            <ChevronRight className="m-0" size={21} />
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
