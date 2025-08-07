'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHeroAnimation } from '@/contexts/HeroAnimationContext'
import NavLinks from '@/const/NavLink'
import HamburgerIcon from '../ui/Hamburger'
import MobileMenu from '../ui/MobileMenu'

const NavBar = () => {
  const pathname = usePathname()
  const {
    isHeroSection,
    isHeroFullyScrolled
  } = useHeroAnimation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log('NavBar State:', {
      pathname,
      isHeroSection,
      isHeroFullyScrolled
    })
  }, [pathname, isHeroSection, isHeroFullyScrolled])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Desktop Navigation Links
  const DesktopNavLinks = ({ isWhite = false }: { isWhite?: boolean }) => (
    <>
      {Object.entries(NavLinks).map(([label, path], index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4 + (index * 0.03),
            duration: 0.4,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={path}
            className={`relative transition-all duration-300 text-sm uppercase tracking-wide ${pathname === path
                ? `font-bold ${isWhite ? 'text-white drop-shadow-lg' : 'text-black'}`
                : `${isWhite ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'}`
              }`}
          >
            {label}
          </Link>
        </motion.div>
      ))}
    </>
  )

  // Desktop Normal Navigation (for non-hero sections)
  const DesktopNormalNav = useCallback(() => (
    <motion.div
      key={`desktop-normal-nav-${pathname}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      exit={{
        y: -80,
        opacity: 0,
        transition: {
          duration: 0.4,
          ease: [0.55, 0.06, 0.68, 0.19]
        }
      }}
      className="w-full fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex gap-8 items-center">
            <DesktopNavLinks isWhite={false} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  ), [pathname])

  // Desktop Glass Navigation (for hero sections)
  const DesktopGlassNav = useCallback(() => (
    <motion.div
      key={`desktop-glass-nav-${pathname}`}
      initial={{ y: -60, opacity: 0, scale: 0.95 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1
        }
      }}
      exit={{
        y: -60,
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: 0.4,
          ease: [0.55, 0.06, 0.68, 0.19]
        }
      }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-auto max-w-[90vw]"
      style={{
        willChange: 'transform, opacity, filter'
      }}
    >
      <div className="py-4 px-8 backdrop-blur-3xl bg-white/10 border border-white/20 rounded-full shadow-2xl">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex gap-7 items-center">
            <DesktopNavLinks isWhite={true} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  ), [pathname])

  // Mobile Navigation (always the same, fixed position)
  const MobileNav = useCallback(() => (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-end mr-2">
        <HamburgerIcon
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isWhite={false}
            />
        </div>
      </div>

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        pathname={pathname}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  ), [isMobileMenuOpen, pathname])

  // Desktop render logic
  const renderDesktopNav = () => {
    // Hide entire navbar when scrolled (regardless of section type)
    if (isHeroFullyScrolled) {
      return null
    }
    
    // Show glass navbar if hero section
    if (isHeroSection) {
      return DesktopGlassNav()
    }
    
    // Show normal navbar for non-hero sections
    return DesktopNormalNav()
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {renderDesktopNav()}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {MobileNav()}
      </div>
    </>
  )
}

export default NavBar