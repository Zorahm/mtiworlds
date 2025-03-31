"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Главная",
      active: pathname === "/",
    },
    {
      href: "/about",
      label: "О нас",
      active: pathname === "/about",
    },
    {
      href: "/news",
      label: "Новости",
      active: pathname === "/news",
    },
    {
      href: "/store",
      label: "Магазин",
      active: pathname === "/store",
    },
    {
      href: "/team",
      label: "Команда",
      active: pathname === "/team",
    },
    {
      href: "/faq",
      label: "FAQ",
      active: pathname === "/faq",
    },
  ]

  return (
    <div className="flex">
      <div className="hidden md:flex gap-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              route.active ? "text-primary-foreground bg-primary" : "text-foreground hover:bg-muted",
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    route.active ? "text-primary-foreground bg-primary" : "text-foreground hover:bg-muted",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}