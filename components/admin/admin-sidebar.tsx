"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  BedDouble,
  Calendar,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Coffee,
  Bell,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean
}

export function AdminSidebar({ className, collapsed = false }: SidebarNavProps) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [notifications, setNotifications] = useState(3)

  const routes = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      variant: "default",
      mockService: true,
    },
    {
      title: "Réservations",
      href: "/admin/reservations",
      icon: Calendar,
      variant: "ghost",
      badge: 12,
      mockService: true,
    },
    {
      title: "Chambres",
      href: "/admin/rooms",
      icon: BedDouble,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: Users,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Services",
      href: "/admin/services",
      icon: Coffee,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Paiements",
      href: "/admin/payments",
      icon: CreditCard,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Statistiques",
      href: "/admin/statistics",
      icon: BarChart3,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      variant: "ghost",
      badge: 5,
      mockService: true,
    },
    {
      title: "Rapports",
      href: "/admin/reports",
      icon: FileText,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Utilisateurs",
      href: "/admin/utilisateurs",
      icon: Users,
      variant: "ghost",
      mockService: true,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
      variant: "ghost",
      mockService: true,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[250px]",
        className,
      )}
    >
      <div className={cn("flex h-14 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <span className="font-bold text-lg">Admin Panel</span>}
        {collapsed && <LayoutDashboard className="h-6 w-6" />}
        <Button variant="outline" size="icon" className="relative" asChild>
          <Link href="/admin/notifications">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                {notifications}
              </span>
            )}
          </Link>
        </Button>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                collapsed && "justify-center px-2",
              )}
              onClick={(e) => {
                // Si la page n'existe pas encore, empêcher la navigation et afficher un message
                if (
                  !route.mockService &&
                  !route.href.includes("dashboard") &&
                  !route.href.includes("utilisateurs") &&
                  !route.href.includes("notifications")
                ) {
                  e.preventDefault()
                  alert(`La page ${route.title} est en cours de développement. Elle utilisera des services simulés.`)
                }
              }}
            >
              <route.icon className={cn("h-5 w-5", collapsed && "h-5 w-5")} />
              {!collapsed && <span>{route.title}</span>}
              {!collapsed && route.badge && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {route.badge}
                </span>
              )}
              {!collapsed && route.mockService && (
                <span className="ml-auto text-[10px] text-muted-foreground">mock</span>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-2">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent")}
          >
            <Home className="h-5 w-5" />
            {!collapsed && <span>Retour au site</span>}
          </Link>
          <button
            onClick={() => signOut()}
            className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent")}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
