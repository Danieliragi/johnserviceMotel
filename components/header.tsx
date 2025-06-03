"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  ChevronDown,
  ChevronRight,
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
  Bed,
  Globe,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("/")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<{ [key: string]: boolean }>({})
  const { language, setLanguage, t } = useLanguage()
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)

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

  const toggleMobileDropdown = (href: string) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as "FR" | "EN")
    setLanguageDropdownOpen(false)
  }

  const navItems = [
    {
      label: t("nav.about"),
      href: "/about",
      dropdown: [
        {
          label: t("nav.documentation"),
          href: "/about/documentation",
          icon: <FileText className="h-4 w-4 mr-2" />,
        },
        {
          label: t("nav.gallery"),
          href: "/about/gallery",
          icon: <ImageIcon className="h-4 w-4 mr-2" />,
        },
        {
          label: t("nav.pricing"),
          href: "/tarifs",
          icon: <DollarSign className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      label: t("nav.services"),
      href: "/services",
      dropdown: [
        {
          label: t("nav.accommodation"),
          href: "/services/hebergement",
          icon: <Hotel className="h-4 w-4 mr-2" />,
          subDropdown: [
            {
              label: t("nav.standardRoom"),
              href: "/chambres/standard",
              icon: <Bed className="h-4 w-4 mr-2" />,
            },
            {
              label: t("nav.deluxeRoom"),
              href: "/chambres/deluxe",
              icon: <Bed className="h-4 w-4 mr-2" />,
            },
            {
              label: t("nav.vipRoom"),
              href: "/chambres/vip",
              icon: <Bed className="h-4 w-4 mr-2" />,
            },
          ],
        },
        {
          label: t("nav.restaurant"),
          href: "/services/restaurant",
          icon: <Utensils className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      label: t("nav.contact"),
      href: "/contact",
      dropdown: [
        {
          label: t("nav.address"),
          href: "/contact/address",
          icon: <Building className="h-4 w-4 mr-2" />,
        },
        {
          label: t("nav.location"),
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
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <a
              href="mailto:johnservicesmotel@gmail.com"
              className="hover:text-primary-foreground/80 transition-colors text-xs sm:text-sm truncate"
            >
              johnservicesmotel@gmail.com
            </a>
          </div>

          {/* Right side - Phone, Language and Social Icons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Phone */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">+243 997 163 443</span>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200 text-xs sm:text-sm"
                onBlur={() => setTimeout(() => setLanguageDropdownOpen(false), 150)}
              >
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium">{language}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${languageDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Language Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 origin-top-right z-50 ${
                  languageDropdownOpen
                    ? "opacity-100 transform scale-100 pointer-events-auto"
                    : "opacity-0 transform scale-95 pointer-events-none"
                }`}
              >
                <div className="py-1 w-20">
                  <button
                    onClick={() => handleLanguageChange("FR")}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors ${
                      language === "FR" ? "bg-primary/10 text-primary font-medium" : "text-gray-700"
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => handleLanguageChange("EN")}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors ${
                      language === "EN" ? "bg-primary/10 text-primary font-medium" : "text-gray-700"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>

            {/* Social Icons - hide on very small screens */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="https://www.facebook.com/profile.php?id=61575803102763"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Facebook className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </Link>
              <Link
                href="https://www.instagram.com/john_services_motel?utm_source=qr&igsh=MWV6OWxoN3Z2NWJ5cw=="
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Instagram className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </Link>
              <Link
                href="https://x.com/John_SMotel?t=Muvk4gx1RnrOxsCFjVlH1A&s=09"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/john-services-motel/"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <Linkedin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
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
        <div className="container mx-auto px-3 sm:px-4 flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-1 sm:gap-2 group" onClick={() => window.scrollTo(0, 0)}>
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden transition-transform duration-300 group-hover:scale-110 border border-gray-200 shadow-sm bg-primary">
              <Image src="/logo-motel-john.png" alt="John Services Motel New Logo" fill className="object-contain" />
            </div>
            <span className="hidden lg:inline-flex flex-col items-center leading-tight font-bold text-lg sm:text-xl transition-colors duration-300 group-hover:text-slate-800">
              <span className="text-2xl sm:text-3xl">John</span>
              <span className="text-xs sm:text-sm font-medium font-['Poppins']">Services Motel</span>
            </span>
            <span className="inline-flex lg:hidden flex-col items-center leading-tight font-bold text-sm sm:text-lg transition-colors duration-300 group-hover:text-slate-800">
              <span className="text-lg sm:text-2xl">John</span>
              <span className="text-xs sm:text-sm font-medium font-['Poppins']">Services Motel</span>
            </span>
          </Link>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map((item) => (
              <div
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => {
                  // Add a small delay before closing to allow moving to dropdown
                  setTimeout(() => {
                    if (hoveredItem === item.href && !hoveredSubItem) {
                      setHoveredItem(null)
                      setHoveredSubItem(null)
                    }
                  }, 100)
                }}
                key={item.href}
              >
                {item.dropdown ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => {
                      // Add a small delay before closing to allow moving to dropdown
                      setTimeout(() => {
                        if (hoveredItem === item.href) {
                          setHoveredItem(null)
                          setHoveredSubItem(null)
                        }
                      }, 150)
                    }}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 px-1 ${
                        activeItem.startsWith(item.href) || hoveredItem === item.href
                          ? "text-[#8c3d0e]"
                          : "hover:text-[#8c3d0e]"
                      }`}
                      onMouseEnter={() => setHoveredItem(item.href)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          hoveredItem === item.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Animated bottom border */}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#8c3d0e] transition-all duration-300 ${
                        hoveredItem === item.href ? "w-full" : "w-0"
                      }`}
                    ></div>

                    {/* Dropdown menu with improved hover handling */}
                    <div
                      className={`absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 origin-top border border-gray-100 ${
                        hoveredItem === item.href
                          ? "opacity-100 transform scale-y-100 pointer-events-auto"
                          : "opacity-0 transform scale-y-0 pointer-events-none"
                      }`}
                      onMouseEnter={() => {
                        setHoveredItem(item.href)
                      }}
                      onMouseLeave={() => {
                        setTimeout(() => {
                          setHoveredItem(null)
                          setHoveredSubItem(null)
                        }, 150)
                      }}
                    >
                      <div className="py-2 w-48">
                        {item.dropdown.map((subItem) => (
                          <div
                            key={subItem.href}
                            className="relative"
                            onMouseEnter={() => {
                              setHoveredSubItem(subItem.href)
                              setHoveredItem(item.href) // Keep parent dropdown open
                            }}
                            onMouseLeave={() => {
                              // Only close subdropdown if not moving to nested dropdown
                              if (!subItem.subDropdown) {
                                setHoveredSubItem(null)
                              }
                            }}
                          >
                            {subItem.subDropdown ? (
                              <div className="relative">
                                <Link
                                  href={subItem.href}
                                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8c3d0e] transition-colors w-full"
                                  onMouseEnter={() => {
                                    setHoveredSubItem(subItem.href)
                                    setHoveredItem(item.href)
                                  }}
                                  onClick={() => {
                                    window.scrollTo(0, 0)
                                    setHoveredItem(null)
                                    setHoveredSubItem(null)
                                  }}
                                >
                                  <div className="flex items-center">
                                    {subItem.icon}
                                    <span>{subItem.label}</span>
                                  </div>
                                  <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-200" />
                                </Link>
                              </div>
                            ) : (
                              <Link
                                href={subItem.href}
                                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8c3d0e] transition-colors"
                                onClick={() => {
                                  window.scrollTo(0, 0)
                                  setHoveredItem(null)
                                  setHoveredSubItem(null)
                                }}
                              >
                                <div className="flex items-center">
                                  {subItem.icon}
                                  <span>{subItem.label}</span>
                                </div>
                              </Link>
                            )}

                            {/* Enhanced nested dropdown for room types */}
                            {subItem.subDropdown && (
                              <div
                                className={`absolute top-0 left-full ml-1 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 origin-top-left z-[100] border border-gray-100 ${
                                  hoveredSubItem === subItem.href
                                    ? "opacity-100 transform scale-100 pointer-events-auto visible"
                                    : "opacity-0 transform scale-95 pointer-events-none invisible"
                                }`}
                                onMouseEnter={() => {
                                  setHoveredSubItem(subItem.href)
                                  setHoveredItem(item.href) // Keep parent dropdown open
                                }}
                                onMouseLeave={() => {
                                  setTimeout(() => {
                                    setHoveredSubItem(null)
                                  }, 100)
                                }}
                              >
                                <div className="py-2 w-52">
                                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                    Choisir une chambre
                                  </div>
                                  {subItem.subDropdown.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.href}
                                      href={nestedItem.href}
                                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#8c3d0e] transition-colors group"
                                      onClick={() => {
                                        window.scrollTo(0, 0)
                                        setHoveredItem(null)
                                        setHoveredSubItem(null)
                                      }}
                                    >
                                      <div className="flex items-center w-full">
                                        {nestedItem.icon}
                                        <span className="flex-1">{nestedItem.label}</span>
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
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

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden md:inline">{profile?.nom_complet || t("auth.myAccount")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      {t("auth.myProfile")}
                    </Link>
                  </DropdownMenuItem>
                  {(profile?.role === "admin" || user.email === "admin@johnservice.com") && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="w-full cursor-pointer">
                        {t("auth.administration")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    {t("auth.signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="hidden sm:inline-flex text-xs sm:text-sm px-2 sm:px-3" asChild>
                <Link href="/auth/login">
                  <span>{t("auth.signIn")}</span>
                </Link>
              </Button>
            )}

            <Button
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md text-xs sm:text-sm px-2 sm:px-3"
              asChild
            >
              <Link href="/chambres">
                <span className="hidden lg:inline">{t("common.reserve")}</span>
                <span className="inline lg:hidden">{t("common.reserve")}</span>
              </Link>
            </Button>

            {/* Menu mobile */}
            <Sheet
              open={isMenuOpen}
              onOpenChange={(open) => {
                setIsMenuOpen(open)
                if (!open) {
                  setMobileDropdownOpen({})
                }
              }}
            >
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden h-8 w-8 sm:h-10 sm:w-10">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px]">
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
                      <div className="relative h-12 w-12 overflow-hidden border border-gray-200 shadow-sm bg-primary">
                        <Image
                          src="/logo-motel-john.png"
                          alt="John Services Motel New Logo"
                          fill
                          className="object-contain"
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
                            <button
                              onClick={() => toggleMobileDropdown(item.href)}
                              className="w-full text-lg font-medium py-3 px-2 flex items-center justify-between bg-gray-50 rounded-md mb-2 hover:bg-gray-100 transition-colors"
                            >
                              {item.label}
                              <ChevronDown
                                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                  mobileDropdownOpen[item.href] ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {mobileDropdownOpen[item.href] && (
                              <div className="pl-3 space-y-1 mb-3">
                                {item.dropdown.map((subItem) => (
                                  <div key={subItem.href}>
                                    {subItem.subDropdown ? (
                                      <div>
                                        <button
                                          type="button"
                                          onClick={() => toggleMobileDropdown(subItem.href)}
                                          className="w-full flex items-center justify-between gap-2 py-2 px-3 text-base text-gray-600 hover:text-[#8c3d0e] hover:bg-gray-100 rounded-md transition-all duration-200"
                                        >
                                          <div className="flex items-center">
                                            {subItem.icon || (
                                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                            )}
                                            <span>{subItem.label}</span>
                                          </div>
                                          <ChevronDown
                                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                              mobileDropdownOpen[subItem.href] ? "rotate-180" : ""
                                            }`}
                                          />
                                        </button>

                                        {mobileDropdownOpen[subItem.href] && (
                                          <div className="pl-6 mt-1 space-y-1">
                                            {subItem.subDropdown.map((nestedItem) => (
                                              <Link
                                                key={nestedItem.href}
                                                href={nestedItem.href}
                                                className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-[#8c3d0e] hover:bg-gray-100 rounded-md transition-all duration-200"
                                                onClick={() => {
                                                  setIsMenuOpen(false)
                                                  window.scrollTo(0, 0)
                                                }}
                                              >
                                                {nestedItem.icon || (
                                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                                )}
                                                <span>{nestedItem.label}</span>
                                              </Link>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <Link
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
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
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
                          <Link href="/profile">{t("auth.myProfile")}</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => {
                            signOut()
                            setIsMenuOpen(false)
                          }}
                        >
                          {t("auth.signOut")}
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="w-full" asChild onClick={() => setIsMenuOpen(false)}>
                        <Link href="/auth/login">{t("auth.signIn")}</Link>
                      </Button>
                    )}

                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => setIsMenuOpen(false)}
                      asChild
                    >
                      <Link href="/chambres">{t("common.reserveNow")}</Link>
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
