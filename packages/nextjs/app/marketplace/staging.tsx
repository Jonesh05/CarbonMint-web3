import { useState } from "react";
import { useRouter } from "next/router";

export default function StagingPage() {
  const [userType, setUserType] = useState<string | null>(null);
  const { isConnected, connector } = useAccount();


  const handleSelection = (type: string) => {
    setUserType(type);
  };

  // Función para manejar la conexión a la billetera
  const handleConnectWallet = async () => {
    if (!isConnected) {
      connect(connector);
    }
  };

  const handleRedirect = () => {

  };

  return (
    <div>
      <h1>Selecciona tu tipo de usuario</h1>
      
      {/* Toggle de switch vendor/logistic */}
      
    </div>
  );
}

