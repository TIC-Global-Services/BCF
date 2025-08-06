'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../Reusable/Container'
import { useHeroAnimation } from '@/contexts/HeroAnimationContext'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface HeroContent {
    title: string[]
    subtitle?: string[]
    buttonText: string
    backgroundImage: string
    fontClassName?: string
}

interface HeroProps {
    content: HeroContent
    isLeft?: boolean
    isRight?: boolean
}

const Hero: React.FC<HeroProps> = ({ content, isRight = false, isLeft = true }) => {
    const heroRef = useRef(null)
    const containerRef = useRef(null)
    const { setHeroAnimationProgress, setIsHeroFullWidth, setIsHeroSection, isHeroSection } = useHeroAnimation()

    useEffect(() => {
        const heroElement = heroRef.current
        const containerElement = containerRef.current

        if (!heroElement || !containerElement) return

        // Check if mobile
        const isMobile = window.innerWidth < 768

        // Set initial state - only apply clipPath for desktop
        if (!isMobile) {
            gsap.set(heroElement, {
                clipPath: `polygon(
            0% 0%, 25% 2%, 50% 4%, 75% 2%, 100% 0%,
            100% 100%, 75% 98%, 50% 96%, 25% 98%, 0% 100% )`,
                borderRadius: '40px'
            });
        } else {
            gsap.set(heroElement, {
                borderRadius: '20px'
            });
        }

        // Scroll-triggered animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerElement,
                start: 'top top',
                end: '+=100%',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress

                    setHeroAnimationProgress(progress)
                    setIsHeroFullWidth(progress > 0.3)

                    // Only apply clipPath animation on desktop
                    if (!isMobile) {
                        const clipPath = progress > 0.3
                            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                            : `polygon(
                    0% 0%, ${25 - progress * 25}% ${2 - progress * 2}%, 50% ${4 - progress * 4}%, ${75 + progress * 25}% ${2 - progress * 2}%, 100% 0%,
                    100% 100%, ${75 + progress * 25}% ${98 + progress * 2}%, 50% ${96 + progress * 4}%, ${25 - progress * 25}% ${98 + progress * 2}%, 0% 100%
                  )`

                        const borderRadius = progress >= 0.8 ? '0px' : `${40 - (progress * 50)}px`

                        gsap.set(heroElement, {
                            clipPath,
                            borderRadius
                        })
                    } else {
                        // For mobile, only animate border radius
                        const borderRadius = progress >= 0.8 ? '0px' : `${20 - (progress * 20)}px`
                        gsap.set(heroElement, {
                            borderRadius
                        })
                    }
                }
            }
        })

        // Animate container padding
        tl.fromTo(containerElement,
            { padding: '16px' },
            { padding: '0px', duration: 1, ease: 'power2.out' }, 0)

        // Animate hero size
        tl.fromTo(heroElement,
            { width: '100%', height: isMobile ? '400px' : '500px', marginTop: "50px" },
            { width: '100vw', height: '100vh', duration: 1, ease: 'power2.out' }, 0)


        ScrollTrigger.create({
            trigger: containerElement,
            start: 'top top',
            end: () => 'bottom top+=1',
            onLeave: () => {
                console.log('Hero fully left the screen')
                setIsHeroSection(false)
            },
            onEnterBack: () => {
                console.log('Hero fully re-entered the screen')
                setIsHeroSection(true)
            },
            onEnter: () => {
                console.log('Hero fully re-entered the screen')
                setIsHeroSection(true)
            },
            // Optional: add `markers: true` here to debug
        })

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            setHeroAnimationProgress(0)
            setIsHeroFullWidth(false)
            setIsHeroSection(false)
        }
    }, [setHeroAnimationProgress, setIsHeroFullWidth, setIsHeroSection])

    return (
        <div ref={containerRef} className='h-screen'>
            <div
                ref={heroRef}
                className="hero-element relative overflow-hidden"
                style={{
                    backgroundImage: `url(${content.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: window.innerWidth < 768 ? '400px' : '500px',
                    width: '100%',
                    borderRadius: window.innerWidth < 768 ? '20px' : '40px',
                    willChange: 'transform, clip-path, border-radius',
                    transform: 'translate3d(0, 0, 0)'
                }}
            >
                {/* Hero Content with Container for proper alignment */}
                <div className="absolute inset-0 flex items-end pb-4 md:pb-7">
                    <Container className="w-full">
                        <div className="text-white flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">

                            <h1 className={`${isLeft ? 'block' : 'hidden'} text-4xl md:text-7xl leading-tight md:leading-20 font-medium text-left ${content.fontClassName || ''}`}>
                                {content.title.map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < content.title.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h1>

                            <div className={`${isRight ? 'flex' : 'hidden'} flex-col items-start w-full md:w-auto`}>
                                <div className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl md:rounded-4xl p-4 md:pl-6 md:pt-16 md:pb-10 md:pr-20 flex flex-col gap-3 md:gap-4 items-start w-full md:w-auto">
                                    <p className="text-lg md:text-2xl mb-1 md:mb-2 text-left font-light leading-6 md:leading-7">
                                        {content.subtitle?.map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                {index < (content.subtitle?.length ?? 0) - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <button className="bg-white text-black px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-gray-100 transition-colors">
                                        {content.buttonText}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Hero