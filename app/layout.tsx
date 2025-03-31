import type React from "react"
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { ThemeProvider } from "next-themes"; // Импортируем из next-themes
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"
import "./globals.css"
import logo from "@/app/img/logo-mw.png"
import { ThemeToggle } from "@/components/theme-toggle"

// Font definitions
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata = {
  title: "MTI-World - Minecraft сервер",
  description: "Ванильный Minecraft сервер с дружелюбным сообществом",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="relative w-8 h-8 overflow-hidden rounded-md">
                      <Image src={logo || "/placeholder.svg"} alt="Server Logo" fill className="object-cover" />
                    </div>
                    <span className="text-xl font-bold font-heading">MTI-World</span>
                  </Link>
                </div>
                <MainNav />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button variant="default" size="sm" className="button-glow" asChild>
                    <Link href="#how-to-join">Начать</Link>
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t bg-background">
              <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-10 overflow-hidden rounded-md">
                        <Image src={logo || "/placeholder.svg"} alt="Server Logo" fill className="object-cover" />
                      </div>
                      <span className="text-xl font-bold font-heading">MTI-World</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ванильный Minecraft сервер с дружелюбным сообществом и уникальными возможностями.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="https://discord.gg/KpQgkdUkgF"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Discord className="h-5 w-5" />
                        <span className="sr-only">Discord</span>
                      </Link>
                      <Link
                        href="https://github.com/Zorahm"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                      <Link
                        href="https://twitter.com/mtiworld"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Навигация</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                          Главная
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                          О нас
                        </Link>
                      </li>
                      <li>
                        <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                          Новости
                        </Link>
                      </li>
                      <li>
                        <Link href="/store" className="text-muted-foreground hover:text-primary transition-colors">
                          Магазин
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Ресурсы</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">
                          Команда
                        </Link>
                      </li>
                      <li>
                        <Link href="/#rules" className="text-muted-foreground hover:text-primary transition-colors">
                          Правила
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#how-to-join"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          Как присоединиться
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Контакты</h3>
                    <ul className="space-y-2">
                      <li className="text-muted-foreground">
                        Email:{" "}
                        <Link href="mailto:support@mtiworld.ru" className="hover:text-primary transition-colors">
                          support@mtiworld.ru
                        </Link>
                      </li>
                      <li className="text-muted-foreground">
                        Discord:{" "}
                        <Link href="https://discord.gg/KpQgkdUkgF" className="hover:text-primary transition-colors">
                          discord.gg/KpQgkdUkgF
                        </Link>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} MTI-World. Все права защищены.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}