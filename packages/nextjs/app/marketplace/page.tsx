"use client";

import React from "react";
import { useAccount } from "wagmi";

const Marketplace = () => {
  useAccount();

  // Datos simulados para mostrar en el marketplace
  const packages = [
    { id: 1, name: "Paquete A", description: "Material biodegradable", price: "5 USDT" },
    { id: 2, name: "Paquete B", description: "Plástico reciclado", price: "10 USDT" },
    { id: 3, name: "Paquete C", description: "Material compostable", price: "15 USDT" },
  ];

  return (
    <div className="py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Marketplace de Embalajes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map(pkg => (
          <div key={pkg.id} className="border rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold">{pkg.name}</h2>
            <p className="text-gray-600">{pkg.description}</p>
            <p className="text-lg font-bold text-green-600">{pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
