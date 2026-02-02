"use client"

import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useData } from "@/context/DataProvider"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()

  // Simple search logic
  const { heroes, warHeroes, places } = useData()
  const searchResults = searchQuery.length > 2 ? [
    ...heroes.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase())),
    ...warHeroes.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase())),
    ...places.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ].slice(0, 5) : []

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const id = href.substring(2)
      // Check if we are already on home page
      if (location.pathname === "/" || location.pathname === "") {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          setIsMenuOpen(false)
        }
      }
    }
  }

  const navItems = [
    { label: "Галоўная", href: "/" },
    { label: "Героі Вайны", href: "/war-heroes" },
    { label: "Стужка часу", href: "/timeline" },
    { label: "Віктарына", href: "/quiz" },
    { label: "Карта", href: "/#map" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false
    return location.pathname === path || (path.startsWith("/#") && location.hash === path.substring(1))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-primary transition-colors hover:text-accent">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Героі Беларусі
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={(e) => item.href.startsWith("/#") ? handleAnchorClick(e, item.href) : null}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href) ? "text-primary font-bold" : "text-muted-foreground"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 relative">
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-muted rounded-full px-3 py-1">
                <Input
                  autoFocus
                  placeholder="Пошук..."
                  className="border-0 bg-transparent h-8 focus-visible:ring-0 w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                />
                <X className="h-4 w-4 cursor-pointer text-muted-foreground" onClick={() => setIsSearchOpen(false)} />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-12 right-0 w-64 bg-background border shadow-xl rounded-md p-2 flex flex-col gap-1"
                >
                  {searchResults.map((item: any, i) => (
                    <Link
                      to="/"
                      key={i}
                      className="block p-2 hover:bg-muted rounded text-sm truncate"
                      onClick={() => {
                        setIsSearchOpen(false)
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/admin">
            <Button variant="outline" size="sm" className="hidden lg:flex">
              Увайсці
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-5">
          <div className="mb-4">
            <Input
              placeholder="Пошук..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="mt-2 border rounded p-2 bg-muted/50">
                {searchResults.map((item: any, i) => (
                  <div key={i} className="py-1 text-sm border-b last:border-0">{item.name}</div>
                ))}
              </div>
            )}
          </div>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-base font-medium transition-colors hover:text-primary ${isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                onClick={(e) => {
                  if (item.href.startsWith("/#")) handleAnchorClick(e, item.href)
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-2">Адмін-панэль</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
