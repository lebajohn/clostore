
"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MobileMenu() {
  return (
    <div className="md:hidden">

      <Sheet>

        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>

        <SheetContent side="right" className="p-6">

          <div className="flex flex-col gap-4">

            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/admin">Admin</Link>

          </div>

        </SheetContent>

      </Sheet>

    </div>
  );
}
