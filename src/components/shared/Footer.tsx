"use client";

import { Facebook, Instagram, Twitter, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col dark:bg-black py-8 px-24 ">
      <div className="flex md:flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Left Hero Section */}
        <div className="flex flex-1 flex-col justify-center gap-8 border-r  border-y border-gray-600 px-10 py-16">
          <h1 className="text-balance lg:text-7xl text-6xl tracking-tight">
            ARE YOU
            <br />
            INTERESTED?
          </h1>
          <Link
            href="#shop"
            className="flex w-fit items-center gap-2 text-lg text-orange-500 transition-all hover:gap-3 hover:text-orange-400"
          >
            Shopping Now
            <span className="text-xl">→</span>
          </Link>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col justify-between border-l border-y border-gray-600 px-8 py-12">
          {/* Header */}
          <div>
            <div className="mb-12 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500">
                <span className="text-sm font-bold text-black">S</span>
              </div>
              <span className="text-xl font-semibold">Sneaker</span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex md:flex-col flex-row gap-6">
              <Link
                href="#shop"
                className="text-base dark:text-gray-600 transition-colors hover:underline"
              >
                Shop
              </Link>
              <Link
                href="#about"
                className="text-base dark:text-gray-600 transition-colors hover:underline"
              >
                About
              </Link>
              <Link
                href="#blog"
                className="text-base dark:text-gray-600 transition-colors hover:underline"
              >
                Blog
              </Link>
              <Link
                href="#contact"
                className="text-base dark:text-gray-600 transition-colors hover:underline"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-8 ">
            <a
              href="#facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 text-gray-600 transition-all hover:border-orange-500 hover:text-orange-500"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 text-gray-600 transition-all hover:border-orange-500 hover:text-orange-500"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 text-gray-600 transition-all hover:border-orange-500 hover:text-orange-500"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#pinterest"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-500 text-gray-600 transition-all hover:border-orange-500 hover:text-orange-500"
              aria-label="Pinterest"
            >
              <Trash2 size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-600 py-4 text-center text-sm text-gray-600">
        Copyright Sneaker Shoes Sales 2024- All Rights Reserved
      </div>
    </div>
  );
}
