"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <span className="sr-only">Toggle sidebar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </Button>
            <Link href="/admin/dashboard" className="mr-4 flex items-center space-x-2">
              <span className="font-bold">JohnService Motel Admin</span>
            </Link>
            <div className="ml-auto flex items-center space-x-4">
              <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                <Button variant="ghost" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Retour au site
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-muted/40">{children}</main>
      </div>
    </div>
  )
}
