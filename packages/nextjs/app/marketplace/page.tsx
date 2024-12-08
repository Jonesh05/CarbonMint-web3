"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const Marketplace = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    // Redirigir a staging para selección de rol
    router.push("/staging");
  }, [router]);

  // Renderiza staging
  return null;
};

export default Marketplace;