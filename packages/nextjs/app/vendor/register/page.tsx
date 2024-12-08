"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function Staging() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Verificar si el usuario ya está registrado al cargar la página
  useEffect(() => {
    if (isConnected && address) {
      const checkRegistration = async () => {
        try {
          const storedData = localStorage.getItem(`vendor_${address}`);
          if (storedData) {
            router.push("/vendor/dashboard");
          }
        } catch (error) {
          console.error("Error checking local storage:", error);
        }
      };
      checkRegistration();
    }
  }, [isConnected, address, router]);

  const handleSelection = async (type: "trucker" | "vendor") => {
    if (!isConnected) {
      return;
    }
    
    setIsLoading(true);
    try {
      if (type === "vendor") {
        // Verificar registro local primero
        const storedData = localStorage.getItem(`vendor_${address}`);
        if (storedData) {
          router.push("/vendor/dashboard");
        } else {
          router.push("/vendor/register");
        }
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
      
      <div className="flex flex-col gap-6 w-[280px]">
        <button
          onClick={() => handleSelection("trucker")}
          disabled={!isConnected || isLoading}
          className="bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-500 
                   text-white px-8 py-3 rounded-full flex items-center justify-center gap-2
                   transition-colors duration-200"
        >
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            "You are Trucker?"
          )}
        </button>
        
        <button
          onClick={() => handleSelection("vendor")}
          disabled={!isConnected || isLoading}
          className="bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-500 
                   text-white px-8 py-3 rounded-full flex items-center justify-center gap-2
                   transition-colors duration-200"
        >
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            "You are Vendor?"
          )}
        </button>

        {!isConnected && (
          <p className="mt-4 text-center text-white">
            Conecta tu wallet para continuar
          </p>
        )}
      </div>
    </div>
  );
}