"use client";

import { useState } from "react";
import Image from "next/image"; // Asegúrate de importar Image correctamente
import { useRouter } from "next/navigation";

export default function Staging() {
  const [userType, setUserType] = useState<"logistic" | "vendor" | null>(null);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#002A15]">
      <div className="relative w-[300px] h-[200px] mb-8">
        <Image 
          src="/Logo.png"
          alt="CarbonMint"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <div className="flex flex-col w-[200px] h-[80px] gap-4">
        <button
          onClick={() => router.push("/logistic")}
          className="bg-[#00FF7F] hover:bg-[#00CC66] text-white px-10 py-2 rounded-full"
        >
          You are Trucker?
        </button>
        <button
          onClick={() => router.push("/vendor")}
          className="bg-[#00FF7F] hover:bg-[#00CC66] text-white px-10 py-2 rounded-full"
        >
          You are Vendor?
        </button>
      </div>
    </div>
  );
}