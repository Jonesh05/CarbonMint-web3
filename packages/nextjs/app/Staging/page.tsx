"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

export default function StagingPage() {
  const [userType, setUserType] = useState<"logistic" | "vendor" | null>(null);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleConnect = (connector: any) => {
    connect(connector);
  };

  const handleSelectUserType = (type: "logistic" | "vendor") => {
    setUserType(type);
  };

  const handleContinue = () => {
    if (!userType) return;
    if (userType === "logistic") {
      router.push("/marketplace");
    } else {
      router.push("/provider-dashboard");
    }
  };

  return (
    <div>
      <h1>You are {userType ? userType : "select"}</h1>
      <div>
        <button onClick={() => handleSelectUserType("logistic")}>You are Logistic</button>
        <button onClick={() => handleSelectUserType("vendor")}>You are Vendor</button>
      </div>

      {!isConnected ? (
        <div>
          <h2>Connect Wallet</h2>
          {connectors.map((connector) => (
            <button key={connector.id} onClick={() => handleConnect(connector)}>
              Connect with {connector.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>Wallet connected. Proceed below:</p>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

export default StagingPage;
