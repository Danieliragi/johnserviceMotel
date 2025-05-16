import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { SessionProvider } from "@/components/auth/session-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "John Services Motel",
  description: "Votre séjour confortable et abordable",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/john-services-logo.jpeg" }],
  openGraph: {
    images: ["/john-services-logo.jpeg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <SessionProvider>
              <AuthProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-grow pt-16">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </AuthProvider>
            </SessionProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
