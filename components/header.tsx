"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  ChevronDown,
  Coffee,
  Mail,
  User,
  Hotel,
  Utensils,
  Phone,
  Facebook,
  Instagram,
  X,
  Linkedin,
  FileText,
  ImageIcon,
  DollarSign,
  Building,
  LocateIcon as LocationIcon,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("/")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Add a try-catch to handle the case when auth context is not available
  const auth = useAuth()
  let user = null
  let signOut = async () => {}
  let profile = null

  try {
    user = auth.user
    signOut = auth.signOut
    profile = auth.profile
  } catch (error) {
    console.error("Auth context not available:", error)
    // Provide fallback values
    user = null
    signOut = async () => {}
    profile = null
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Set active item based on current path and update it when the path changes
    const updateActivePath = () => {
      const path = window.location.pathname
      setActiveItem(path)
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
    {
      label: "À propos",
      href: "/about",
      dropdown: [
        {
          label: "Documentation",
          href: "/about/documentation",
          icon: <FileText className="h-4 w-4 mr-2" />,
        },
        {
          label: "Galerie",
          href: "/about/gallery",
          icon: <ImageIcon className="h-4 w-4 mr-2" />,
        },
        {
          label: "Tarifs",
          href: "/tarifs",
          icon: <DollarSign className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      label: "Services",
      href: "/services",
      dropdown: [
        {
          label: "Hébergement",
          href: "/services/hebergement",
          icon: <Hotel className="h-4 w-4 mr-2" />,
        },
        {
          label: "Salle & Restaurant",
          href: "/services/restaurant",
          icon: <Utensils className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      dropdown: [
        {
          label: "Adresse",
          href: "/contact#address",
          icon: <Building className="h-4 w-4 mr-2" />,
        },
        {
          label: "Localisation",
          href: "/localisation",
          icon: <LocationIcon className="h-4 w-4 mr-2" />,
        },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left side - Email */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:johnservicesmotel@gmail.com" className="hover:text-primary-foreground/80 transition-colors">
              johnservicesmotel@gmail.com
            </a>
          </div>

          {/* Right side - Phone and Social Icons */}
          <div className="flex items-center gap-4">
            {/* Phone */}
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+243 997 163 443</span>
            </div>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="https://www.facebook.com/profile.php?id=61575803102763"
                className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Facebook className="h-3 w-3" />
              </Link>
              <Link
                href="https://www.instagram.com/john_services_motel?utm_source=qr&igsh=MWV6OWxoN3Z2NWJ5cw=="
                className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Instagram className="h-3 w-3" />
              </Link>
              <Link
                href="https://x.com/John_SMotel?t=Muvk4gx1RnrOxsCFjVlH1A&s=09"
                className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <X className="h-3 w-3" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/john-services-motel/"
                className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Linkedin className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200" : "bg-white border-b"
        }`}
      >
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => window.scrollTo(0, 0)}>
            <div className="relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 border border-gray-200 shadow-sm bg-primary p-1">
              <Image
                src="/john-services-logo.jpeg"
                alt="John Services Motel Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="hidden sm:inline-block md:hidden lg:inline-block font-bold text-xl transition-colors duration-300 group-hover:text-slate-800">
              John Services Motel
            </span>
            <span className="inline-block sm:hidden font-bold text-xl transition-colors duration-300 group-hover:text-slate-800">
              JSM
            </span>
          </Link>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 px-1 ${
                        activeItem.startsWith(item.href) || hoveredItem === item.href
                          ? "text-[#8c3d0e]"
                          : "hover:text-[#8c3d0e]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Animated bottom border */}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#8c3d0e] transition-all duration-300 ${
                        hoveredItem === item.href ? "w-full" : "w-0"
                      }`}
                    ></div>

                    {/* Dropdown menu with animation */}
                    <div
                      className={`absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 origin-top ${
                        hoveredItem === item.href
                          ? "opacity-100 transform scale-y-100 pointer-events-auto"
                          : "opacity-0 transform scale-y-0 pointer-events-none"
                      }`}
                    >
                      <div className="py-2 w-48">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8c3d0e] transition-colors"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 px-1 ${
                        activeItem === item.href || hoveredItem === item.href
                          ? "text-[#8c3d0e]"
                          : "hover:text-[#8c3d0e]"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>

                    {/* Animated bottom border */}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#8c3d0e] transition-all duration-300 ${
                        hoveredItem === item.href ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{profile?.nom_complet || "Mon compte"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  {(profile?.role === "admin" || user.email === "admin@johnservice.com") && (
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
                <Link href="/auth/login">
                  <span className="hidden lg:inline">Se connecter</span>
                  <span className="inline lg:hidden">Login</span>
                </Link>
              </Button>
            )}

            <Button
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md"
              asChild
            >
              <Link href="/chambres">
                <span className="hidden lg:inline">Réserver</span>
                <span className="inline lg:hidden">Réserver</span>
              </Link>
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
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => {
                        setIsMenuOpen(false)
                        window.scrollTo(0, 0)
                      }}
                    >
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-primary p-1">
                        <Image
                          src="/john-services-logo.jpeg"
                          alt="John Services Motel Logo"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <span className="font-bold text-xl">John Services Motel</span>
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
                                  className="flex items-center gap-2 py-2 px-3 text-base text-gray-600 hover:text-[#8c3d0e] hover:bg-gray-100 rounded-md transition-all duration-200"
                                  onClick={() => {
                                    setIsMenuOpen(false)
                                    window.scrollTo(0, 0)
                                  }}
                                >
                                  {subItem.icon || <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>}
                                  <span>{subItem.label}</span>
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
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-[#8c3d0e]"
                              }`}
                              onClick={() => {
                                setIsMenuOpen(false)
                                window.scrollTo(0, 0)
                              }}
                            >
                              {item.href === "/services" && <Coffee className="h-5 w-5" />}
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
      </div>
    </header>
  )
}
