"use client";

import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";

const packages = [
  { id: 1, name: "Bolsa Reciclable", price: "0.05 ETH", image: "/bag.png" },
  { id: 2, name: "Caja de Cartón", price: "0.08 ETH", image: "/box.png" },
  { id: 3, name: "Botella PET", price: "0.1 ETH", image: "/bottle.png" },
];

const Marketplace = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Marketplace de Embalajes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-lg shadow-lg p-5 flex flex-col items-center";
          >
            <Image
              src={pkg.image}
              alt={pkg.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{pkg.name}</h2>
            <p className="text-gray-600 mt-2">{pkg.price}</p>
            <Link href={`/buy/${pkg.id}`} passHref>
              <button className="mt-5 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                Comprar y Obtener NFT
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;