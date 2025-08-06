'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHeroAnimation } from '@/contexts/HeroAnimationContext'

const NavBar = () => {
  const pathname = usePathname()
  const { isHeroFullWidth, isHeroSection } = useHeroAnimation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Debug logging to see the states
  useEffect(() => {
    console.log('NavBar State:', { 
      pathname, 
      isHeroSection, 
      isHeroFullWidth, 
      shouldShowGlass: isHeroSection && isHeroFullWidth 
    })
  }, [pathname, isHeroSection, isHeroFullWidth])

  const NavLinks = {
    "Home": "/",
    "About": "/about",
    "Expertise": "/expertise",
    "Adaption": "/adaption",
    "Product": "/products",
    "Customers": "/customers",
    "Contact": "/contact",
  }

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

  // Animation variants
  const normalNavVariants = {
    hidden: {
      y: -80,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      y: -80,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  }

  const glassNavVariants = {
    hidden: {
      y: -60,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }
    },
    exit: {
      y: -60,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const mobileMenuItemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  // Hamburger Icon Component
  const HamburgerIcon = ({ isOpen, onClick, textColor }) => (
    <motion.button
      onClick={onClick}
      className="relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle menu"
    >
      <div className="w-6 h-6 relative flex flex-col justify-center">
        {/* Top line */}
        <motion.div
          className={`w-6 h-0.5 ${textColor} absolute`}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -6
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        
        {/* Middle line */}
        <motion.div
          className={`w-6 h-0.5 ${textColor} absolute`}
          animate={{
            opacity: isOpen ? 0 : 1
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        
        {/* Bottom line */}
        <motion.div
          className={`w-6 h-0.5 ${textColor} absolute`}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 6
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </motion.button>
  )

  // Mobile Menu Component
  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 backdrop-blur-3xl bg-black/20"
        >
          <div className="flex flex-col items-center justify-center h-full p-8">
            <motion.div className="space-y-2 w-full max-w-sm">
              {Object.entries(NavLinks).map(([label, path]) => (
                <motion.div
                  key={label}
                  variants={mobileMenuItemVariants}
                  className="w-full"
                >
                  <Link
                    href={path}
                    className={`block w-full text-center py-3 px-8 rounded-2xl text-xl font-medium transition-all duration-300 backdrop-blur-xl border ${
                      pathname === path
                        ? 'bg-white/30 text-white border-white/40 font-bold shadow-lg'
                        : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block"
                    >
                      {label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Close button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-12 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Desktop Navigation Links - FIXED COLOR LOGIC
  const DesktopNavLinks = ({ isGlass = false }) => (
    <>
      {Object.entries(NavLinks).map(([label, path], index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: isGlass ? 0.4 + (index * 0.03) : 0.3 + (index * 0.05),
            duration: isGlass ? 0.4 : 0.5,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={path}
            className={`relative transition-all duration-300 text-sm uppercase tracking-wide ${
              pathname === path
                ? `font-bold ${isGlass ? 'text-white drop-shadow-lg' : 'text-black'}`
                : `${isGlass ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'}`
            }`}
          >
            {label}
          </Link>
        </motion.div>
      ))}
    </>
  )

  // Normal Navigation (Non-hero pages)
  const NormalNav = useCallback(() => (
    <motion.div
      key={`normal-nav-${pathname}`}
      variants={normalNavVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center mx-auto">
            <DesktopNavLinks isGlass={false} />
          </div>

          {/* Mobile Glass Hamburger */}
          <div className="md:hidden ml-auto">
            <div className="p-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-full">
              <HamburgerIcon
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                textColor="bg-gray-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <MobileMenu />
    </motion.div>
  ), [pathname, isMobileMenuOpen])

  // Glass Navigation (Hero pages) - FIXED
  const GlassNav = useCallback(() => (
    <motion.div
      key={`glass-nav-${pathname}`}
      variants={glassNavVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-auto max-w-[90vw]"
      style={{
        willChange: 'transform, opacity, filter'
      }}
    >
      <div className="py-4 px-8 backdrop-blur-3xl bg-white/10 border border-white/20 rounded-full shadow-2xl">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Desktop Glass Navigation - FIXED */}
          <div className="hidden md:flex gap-7 items-center">
            <DesktopNavLinks isGlass={true} />
          </div>

          {/* Mobile Glass Hamburger */}
          <div className="md:hidden">
            <HamburgerIcon
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              textColor="bg-white"
            />
          </div>
        </motion.div>
      </div>
      
      <MobileMenu />
    </motion.div>
  ), [pathname, isMobileMenuOpen])

  return (
    <>
      <div className={`md:block hidden`}>
        <AnimatePresence mode="wait">
          {(isHeroSection && isHeroFullWidth) ? GlassNav() : NormalNav()}
        </AnimatePresence>
      </div>
      <div className='md:hidden'>
        <AnimatePresence mode="wait">
          {NormalNav()}
        </AnimatePresence>
      </div>
    </>
  )
}

export default NavBar