'use client'
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface SectionConfig {
  id: string
  name: string
  navbarStyle: 'normal' | 'glass-white' | 'glass-black'
  isVisible: boolean
}

interface SectionRegistration {
  id: string
  name: string
  navbarStyle: 'normal' | 'glass-white' | 'glass-black'
}

interface HeroAnimationContextType {
  // Hero animation states
  heroAnimationProgress: number
  setHeroAnimationProgress: React.Dispatch<React.SetStateAction<number>>
  isHeroFullWidth: boolean
  setIsHeroFullWidth: React.Dispatch<React.SetStateAction<boolean>>
  isHeroSection: boolean
  setIsHeroSection: React.Dispatch<React.SetStateAction<boolean>>
  
  // Section management
  sections: SectionConfig[]
  currentSection: SectionConfig | null
  registerSection: (section: SectionRegistration) => void
  updateSectionVisibility: (sectionId: string, isVisible: boolean) => void
  getCurrentNavbarStyle: () => 'normal' | 'glass-white' | 'glass-black'
  
  // Hero fully scrolled state
  isHeroFullyScrolled: boolean
  setIsHeroFullyScrolled: React.Dispatch<React.SetStateAction<boolean>>
}

const HeroAnimationContext = createContext<HeroAnimationContextType | undefined>(undefined)

interface HeroAnimationProviderProps {
  children: ReactNode
}

export const HeroAnimationProvider: React.FC<HeroAnimationProviderProps> = ({ children }) => {
  const [heroAnimationProgress, setHeroAnimationProgress] = useState(0)
  const [isHeroFullWidth, setIsHeroFullWidth] = useState(false)
  const [isHeroSection, setIsHeroSection] = useState(false)
  const [isHeroFullyScrolled, setIsHeroFullyScrolled] = useState(false)
  const [sections, setSections] = useState<SectionConfig[]>([])
  const [currentSection, setCurrentSection] = useState<SectionConfig | null>(null)

  // Register a section with its navbar requirements
  const registerSection = useCallback((section: SectionRegistration) => {
    setSections(prev => {
      const exists = prev.find(s => s.id === section.id)
      if (exists) {
        return prev.map(s => s.id === section.id ? { ...section, isVisible: s.isVisible } : s)
      }
      return [...prev, { ...section, isVisible: false }]
    })
  }, [])

  // Update section visibility and current section
  const updateSectionVisibility = useCallback((sectionId: string, isVisible: boolean) => {
    setSections(prev => {
      const updated = prev.map(section => 
        section.id === sectionId ? { ...section, isVisible } : section
      )
      
      let newCurrentSection: SectionConfig | null = null
      
      if (isVisible) {
        // The section that just became visible is the current one
        newCurrentSection = updated.find(section => section.id === sectionId) || null
      } else {
        // Find any other visible section
        newCurrentSection = updated.find(section => section.isVisible) || null
      }
      
      console.log('Section visibility updated:', {
        sectionId,
        isVisible,
        newCurrentSection: newCurrentSection?.name || 'none',
        allSections: updated.map(s => ({ name: s.name, visible: s.isVisible }))
      })
      
      setCurrentSection(newCurrentSection)
      
      return updated
    })
  }, [])

  // Simple and clear navbar style logic
  const getCurrentNavbarStyle = useCallback((): 'normal' | 'glass-white' | 'glass-black' => {
    // Get current scroll position
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    console.log('getCurrentNavbarStyle called:', {
      scrollY,
      isHeroSection,
      heroAnimationProgress,
      currentSection: currentSection?.name || 'none'
    });

    // Rule 1: If at the very top of page (scroll = 0), always show normal navbar
    if (scrollY === 0) {
      console.log('Returning normal - at top of page');
      return 'normal'
    }

    // Rule 2: If in hero section, show glass-white
    if (isHeroSection) {
      console.log('Returning glass-white - in hero section');
      return 'glass-white'
    }

    // Rule 3: If there's a current section, use its style
    if (currentSection) {
      console.log('Returning section style:', currentSection.navbarStyle);
      return currentSection.navbarStyle
    }

    // Rule 4: Default to glass-black
    console.log('Returning default glass-black');
    return 'glass-black'
  }, [isHeroSection, heroAnimationProgress, currentSection])

  return (
    <HeroAnimationContext.Provider
      value={{
        heroAnimationProgress,
        setHeroAnimationProgress,
        isHeroFullWidth,
        setIsHeroFullWidth,
        isHeroSection,
        setIsHeroSection,
        sections,
        currentSection,
        registerSection,
        updateSectionVisibility,
        getCurrentNavbarStyle,
        isHeroFullyScrolled,
        setIsHeroFullyScrolled
      }}
    >
      {children}
    </HeroAnimationContext.Provider>
  )
}

export const useHeroAnimation = () => {
  const context = useContext(HeroAnimationContext)
  if (!context) {
    throw new Error('useHeroAnimation must be used within a HeroAnimationProvider')
  }
  return context
}