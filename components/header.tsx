"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="border-b">

      <div className="flex items-center justify-between px-4 py-3">

        <Link href="/" className="text-xl font-bold">
          Clostore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/products">Products</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu />

      </div>

    </header>
  );
}