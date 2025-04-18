"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sword } from "lucide-react";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center">
        <div className="flex items-center space-x-2 mr-4">
          <Sword className="h-6 w-6 text-orange-500" />
          <Link href="/" className="text-lg font-bold text-orange-500">
            APEX Info Hub
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-orange-500",
                pathname === item.href ? "text-orange-500" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}