'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Moon, Sun, ShoppingCart, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useClerk, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user } = useUser()
  const { signOut } = useClerk()
  const isAuthenticated = !!user
  const logout = signOut

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            M
          </div>
          <span className="hidden sm:inline">Maintenance</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Cart Button */}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-primary transition-colors"
              aria-label="Panier"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Button>
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                {user.imageUrl && (
                  <img
                    src={user.imageUrl || "/placeholder.svg"}
                    alt={user.firstName || 'User'}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                {!user.imageUrl && (
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {user.firstName?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="text-sm font-medium hidden lg:inline">{user.firstName || 'User'}</span>
              </div>
              <Link href="/account" className="hidden lg:block">
                <Button variant="ghost" size="sm" className="bg-transparent">
                  Mon compte
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="gap-2 bg-transparent"
                aria-label="Logout"
              >
                Déconnecter
              </Button>
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="hidden sm:block">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Connexion
                </Button>
              </Link>

              <Link href="/sign-up" className="hidden sm:block">
                <Button size="sm">
                  S'inscrire
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-card">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Cart Link */}
            <Link
              href="/cart"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="h-4 w-4" />
              Panier
            </Link>

            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                    {user.imageUrl && (
                      <img
                        src={user.imageUrl || "/placeholder.svg"}
                        alt={user.firstName || 'User'}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    {!user.imageUrl && (
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                        {user.firstName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-sm font-medium">{user.firstName || 'User'}</span>
                  </div>
                  <Link href="/account" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Mon compte
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    className="w-full bg-transparent"
                  >
                    Déconnecter
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full">
                      S'inscrire
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
