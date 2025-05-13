"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Home, BedDouble, Coffee, CreditCard, MapPin, Mail, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("/")
  const [scrollProgress, setScrollProgress] = useState(0)

  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    // Set active item based on current path and update it when the path changes
    const updateActivePath = () => {
      setActiveItem(window.location.pathname)
    }

    updateActivePath()

    // Listen for route changes
    window.addEventListener("popstate", updateActivePath)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("popstate", updateActivePath)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { label: "Accueil", href: "/" },
    {
      label: "Chambres",
      href: "/chambres",
      dropdown: [
        { label: "Standard", href: "/chambres/standard" },
        { label: "Familiale", href: "/chambres/familiale" },
        { label: "Premium", href: "/chambres/premium" },
      ],
    },
    { label: "Services", href: "/services" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Localisation", href: "/localisation" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200" : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 border border-gray-200 shadow-sm">
            <Image src="/john-services-sign.png" alt="John Services Motel Logo" fill className="object-cover" />
          </div>
          <span className="font-bold text-xl transition-colors duration-300 group-hover:text-slate-800">
            JohnService Motel
          </span>
        </Link>

        {/* Navigation pour desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium hover:text-slate-800 transition-colors">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {item.dropdown.map((subItem) => (
                    <DropdownMenuItem key={subItem.href} asChild>
                      <Link href={subItem.href} className="w-full cursor-pointer">
                        {subItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  activeItem === item.href ? "text-slate-800" : "hover:text-slate-800"
                }`}
              >
                {item.label}
                {activeItem === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-sm transition-all duration-300" />
                )}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Mon compte</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full cursor-pointer">
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                {(user.user_metadata?.role === "admin" || user.email === "admin@johnservice.com") && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="w-full cursor-pointer">
                      Administration
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/auth/login">Se connecter</Link>
            </Button>
          )}

          <Button
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md"
            asChild
          >
            <Link href="/chambres">Réserver</Link>
          </Button>

          {/* Menu mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src="/john-services-sign.png"
                        alt="John Services Motel Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-xl">JohnService Motel</span>
                  </Link>
                </div>
                <nav className="flex flex-col">
                  {navItems.map((item) => (
                    <div key={item.href} className="group">
                      {item.dropdown ? (
                        <div className="mb-3">
                          <p className="text-lg font-medium py-3 px-2 flex items-center justify-between bg-gray-50 rounded-md mb-2">
                            {item.label}
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          </p>
                          <div className="pl-3 space-y-1 mb-3">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="flex items-center gap-2 py-2 px-3 text-base text-gray-600 hover:text-slate-800 hover:bg-gray-100 rounded-md transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                          <div className="border-b border-gray-100 mb-3"></div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <Link
                            href={item.href}
                            className={`flex items-center gap-2 py-3 px-3 rounded-md transition-all duration-200 ${
                              activeItem === item.href
                                ? "bg-slate-800 text-white font-medium"
                                : "text-gray-700 hover:bg-gray-100 hover:text-slate-800"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.href === "/" && <Home className="h-5 w-5" />}
                            {item.href === "/chambres" && <BedDouble className="h-5 w-5" />}
                            {item.href === "/services" && <Coffee className="h-5 w-5" />}
                            {item.href === "/tarifs" && <CreditCard className="h-5 w-5" />}
                            {item.href === "/localisation" && <MapPin className="h-5 w-5" />}
                            {item.href === "/contact" && <Mail className="h-5 w-5" />}
                            {item.label}
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-auto pt-6 flex flex-col gap-4">
                  {user ? (
                    <>
                      <Button variant="outline" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                        <Link href="/profile">Mon profil</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                      >
                        Se déconnecter
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link href="/auth/login">Se connecter</Link>
                    </Button>
                  )}

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setIsMenuOpen(false)}
                    asChild
                  >
                    <Link href="/chambres">Réserver maintenant</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Scroll Progress Bar */}
      <div className="h-1 bg-gray-100 w-full">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </header>
  )
}
