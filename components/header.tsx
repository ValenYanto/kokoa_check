"use client"

import { Leaf } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./ui/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="hidden font-bold sm:inline-block">
            Sistem Diagnosis Tanaman Kakao
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-2">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Beranda
            </Link>
            <Link 
              href="/diagnosa" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Diagnosa
            </Link>
            <Link 
              href="/riwayat" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Riwayat
            </Link>
            <Link 
              href="/info" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Info
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}