"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="relative w-full h-[378px] overflow-hidden">
        <Image alt="Banner" src="/Untitled-8 (2).png" fill style={{ objectFit: "cover" }} priority />
      </div>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to </span>
            <span className="block text-4xl font-bold">CARBON MINT</span>
          </h1>
          {/* <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
