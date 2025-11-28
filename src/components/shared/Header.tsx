"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./Theme-toggle";
import ProfileMenu from "./Portfolio";
import Link from "next/link";

const navbar = ["Product", "Banner", "About", "Contact"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#mobile-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href.split("#")[1];
    window.scrollTo({
      top: document.getElementById(href)?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-black shadow-lg p-4 flex items-center justify-between z-50">
      <div className="flex items-center">
        <Image src="/logo.png" width={80} height={80} alt="logo" />
      </div>

      <nav className="hidden md:flex space-x-6">
        {navbar.map((item) => (
          <a
            key={item}
            onClick={handleScroll}
            href={`#${item}`}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        <ModeToggle />

        <Link href={"/carts"} className="cursor-pointer">
          <CiShoppingCart className="text-2xl" />
        </Link>

        <ProfileMenu />

        <button className="md:hidden" onClick={toggleMenu}>
          <Menu className="text-2xl" />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-0 left-0 w-full bg-white dark:bg-black shadow-md flex flex-col items-center md:hidden h-screen"
        >
          <button className="absolute top-5 right-5" onClick={toggleMenu}>
            <X className="text-2xl" />
          </button>

          {["Home", "Shop", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="py-3 text-gray-700 dark:text-gray-200 w-full text-center hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
