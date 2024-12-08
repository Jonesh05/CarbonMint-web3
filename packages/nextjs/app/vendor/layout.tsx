// app/vendor/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

interface VendorLayoutProps {
  children: React.ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (!isConnected) {
        router.push("/staging");
        return;
      }

      try {
        const response = await fetch(`/api/vendor/check/${address}`);
        const { isRegistered } = await response.json();
        
        if (!isRegistered) {
          router.push("/vendor/register");
        }
      } catch (error) {
        console.error("Access check error:", error);
        router.push("/staging");
      }
    };

    checkAccess();
  }, [isConnected, address, router]);

  return (
    <div className="min-h-screen bg-[#002A15] text-white">
      <header className="bg-[#003A25] p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Vendor Dashboard</h1>
          <nav className="flex gap-4">
            <button className="hover:text-green-400">Information</button>
            <button className="hover:text-green-400">Transfers</button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}