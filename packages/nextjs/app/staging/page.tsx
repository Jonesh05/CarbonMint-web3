"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function Staging() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const checkVendorRegistration = async () => {
    try {
      const response = await fetch(`/api/vendor/check/${address}`);
      const { isRegistered } = await response.json();
      return isRegistered;
    } catch (error) {
      console.error("Error checking registration:", error);
      return false;
    }
  };

  const handleSelection = async (type: "trucker" | "vendor") => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      if (type === "vendor") {
        const isRegistered = await checkVendorRegistration();
        router.push(isRegistered ? "/vendor/dashboard" : "/vendor/register");
      } else {
        router.push("/logistic");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#002A15]">
      <div className="w-[300px] h-[100px] relative mb-12">
        <Image 
          src="/Logo.png"
          alt="CarbonMint"
          width={300}
          height={100}
          className="object-contain"
          priority
        />
      </div>
      
      <div className="flex flex-col gap-6">
        <button
          onClick={() => handleSelection("trucker")}
          disabled={!isConnected || isLoading}
          className="bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-500 
                   text-white px-8 py-3 rounded-full flex items-center justify-center gap-2"
        >
          {isLoading ? "Loading..." : "You are Trucker?"}
        </button>
        
        <button
          onClick={() => handleSelection("vendor")}
          disabled={!isConnected || isLoading}
          className="bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-500 
                   text-white px-8 py-3 rounded-full flex items-center justify-center gap-2"
        >
          {isLoading ? "Loading..." : "You are Vendor?"}
        </button>
      </div>

      {!isConnected && (
        <p className="mt-4 text-white">Conecta tu wallet para continuar</p>
      )}
    </div>
  );
}