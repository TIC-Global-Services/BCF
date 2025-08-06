// contexts/HeroAnimationContext.js
'use client'
import React, { createContext, useContext, useState } from 'react'

interface HeroAnimationContextType {
    heroAnimationProgress: number
    setHeroAnimationProgress: React.Dispatch<React.SetStateAction<number>>
    isHeroFullWidth: boolean
    setIsHeroFullWidth: React.Dispatch<React.SetStateAction<boolean>>
    setIsHeroSection:React.Dispatch<React.SetStateAction<boolean>>
    isHeroSection:boolean
}

const HeroAnimationContext = createContext<HeroAnimationContextType | undefined>(undefined)


export const HeroAnimationProvider = ({ children }: any) => {
    const [heroAnimationProgress, setHeroAnimationProgress] = useState(0)
    const [isHeroFullWidth, setIsHeroFullWidth] = useState(false)
    const [isHeroSection,setIsHeroSection] = useState(false);

    return (
        <HeroAnimationContext.Provider
            value={{
                heroAnimationProgress,
                setHeroAnimationProgress,
                isHeroFullWidth,
                setIsHeroFullWidth,
                setIsHeroSection,
                isHeroSection
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