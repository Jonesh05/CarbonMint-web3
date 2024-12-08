"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BeakerIcon, ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/outline";



type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Provider Dashboard",
    href: "/vendor",
    icon: <BeakerIcon className="h-8 w-5 font-semibold" />,
  },
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: <ShoppingCartIcon className="h-8 w-5 font-semibold" />,
  },
  {
    label: "Logistics",
    href: "/logistics",
    icon: <TruckIcon className="h-8 w-5 font-semibold" />,
  },
];  

const HeaderMenuLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <div></div>
      {menuLinks.map(({ label, href, icon }) => (
        <li key={href}>
          <Link
            href={href}
            passHref
            className={`${
              pathname === href ? "bg-green-100 text-green-800 semibold justify-items-center flex p5" : ""
          } hover:bg-green-50 hover:text-green-700 focus:bg-green-100 active:text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
        >
        {icon}
      <span>{label}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (burgerMenuRef.current && !burgerMenuRef.current.contains(event.target as Node)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex  w-auto sticky lg:static lg:static top-0 navbar bg-white min-h-0 flex-shrink-0 justify-center z-20 shadow-md shadow-green-100 px-0 sm:px-2">
      <div className="navbar-start justify-center flex lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-green-50" : "hover:bg-transparent"}`}
            onClick={() => setIsDrawerOpen(prev => !prev)}
          >
            <Bars3Icon className="h-6 w-6 semibold" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content justify-center flex mt-3 p-2 shadow bg-white rounded-box w-52"
              onClick={() => setIsDrawerOpen(false)}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex text-lg font-semibold items-center gap-4 ml-6 mr-8 shrink-0">
          <div className="flex justify-items-start w-40 h-14">
            <Image
              className="cursor-pointer object-contain w-auto justify-left"
              width={238}
              height={118}
              priority
              alt="CarbonMint logo"
              src="/Logo.png"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold leading-tight text-green-800">CarbonMint</span>
            <span className="text-sm text-green-600">Eco Package Marketplace</span>
          </div>
        </Link>
        <ul className="lg:flex lg:flex-nowrap justify-center menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <ConnectButton />
      </div>
    </div>
  );
};
