"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sword } from "lucide-react";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between px-4">
        {/* ロゴ */}
        <div className="flex items-center space-x-2">
          <Sword className="h-6 w-6 text-orange-500" />
          <Link href="/" className="text-lg font-bold text-orange-500">
            APEX Info Hub
          </Link>
        </div>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-orange-500",
                pathname === item.href
                  ? "text-orange-500"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* モバイル用ハンバーガーメニュー */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* 背景オーバーレイ */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* メニュー本体 */}
          <div className="fixed top-0 right-0 h-full w-64 bg-zinc-900/95 shadow-lg z-50 transition-transform duration-300 transform translate-x-0 border-l border-white/10">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <span className="text-lg font-bold text-white">メニュー</span>
              <button
                className="text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2 text-sm font-medium bg-black/90">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded px-3 py-2 transition-colors",
                    pathname === item.href
                      ? "bg-orange-500 text-white font-bold"
                      : "text-white/90 hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
