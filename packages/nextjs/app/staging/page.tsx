// "use client";

// import { useState } from "react";
// import Image from "next/image"; // Asegúrate de importar Image correctamente
// import { useRouter } from "next/navigation";

// export default function Staging() {
//   const [userType, setUserType] = useState<"logistic" | "vendor" | null>(null);
//   const router = useRouter();

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-[#002A15]">
//       <div className="relative w-[300px] h-[200px] mb-8">
//         <Image 
//           src="/Logo.png"
//           alt="CarbonMint"
//           fill
//           className="object-contain"
//           priority
//         />
//       </div>
      
//       <div className="flex flex-col w-[200px] h-[80px] gap-4">
//         <button
//           onClick={() => router.push("/logistic")}
//           className="bg-[#00FF7F] hover:bg-[#00CC66] text-white px-10 py-2 rounded-full"
//         >
//           You are Trucker?
//         </button>
//         <button
//           onClick={() => router.push("/vendor")}
//           className="bg-[#00FF7F] hover:bg-[#00CC66] text-white px-10 py-2 rounded-full"
//         >
//           You are Vendor?
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Image from "next/image";

type UserType = "logistic" | "vendor";

export default function Staging() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redireccionar si no está conectado
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  const handleUserSelect = async (type: UserType) => {
    try {
      setIsLoading(true);
      const route = type === "vendor" ? "/vendor" : "/logistic";
      await router.push(route);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#002A15] text-white">
        <p className="text-xl">Conéctate a tu wallet para continuar</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#002A15]">
      <div className="relative w-[300px] h-[100px] mb-12">
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
          onClick={() => handleUserSelect("logistic")}
          disabled={isLoading}
          className="bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-400 
                   text-white font-medium px-8 py-3 rounded-full 
                   transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              <span>You are Trucker?</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleUserSelect("vendor")}
          disabled={isLoading}
          className="bg-[#00FF7F] hover:bg-[#00CC66] disabled:bg-gray-400 
                   text-white font-medium px-8 py-3 rounded-full 
                   transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              <span>You are Vendor?</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
