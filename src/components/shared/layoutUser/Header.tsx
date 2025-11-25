"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../Theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "./Portfolio";

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <Image src="/logo.png" width={80} height={80} alt="logo" />
      </motion.div>

      <nav className="hidden md:flex space-x-6">
        {navbar.map((item, index) => (
          <motion.a
            onClick={handleScroll}
            key={item}
            href={`#${item}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
          >
            {item}
          </motion.a>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        <ModeToggle />

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
        >
          <CiShoppingCart className="text-2xl" />
        </motion.div>

        <ProfileMenu />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="text-2xl" />
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full bg-white dark:bg-black shadow-md flex flex-col items-center md:hidden h-screen"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-5 right-5"
              onClick={toggleMenu}
            >
              <X className="text-2xl" />
            </motion.button>

            {["Home", "Shop", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="py-3 text-gray-700 dark:text-gray-200 w-full text-center hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
