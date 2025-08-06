"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeroAnimation } from "@/contexts/HeroAnimationContext";
import Container from "./Container";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HeroContent {
    title: string[];
    subtitle?: string[];
    buttonText: string;
    backgroundImage: string;
    fontClassName?: string;
}

interface HeroProps {
    content: HeroContent;
    isLeft?: boolean;
    isRight?: boolean;
}

const Hero: React.FC<HeroProps> = ({
    content,
    isRight = false,
    isLeft = true,
}) => {
    const heroRef = useRef(null);
    const containerRef = useRef(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const [triggerInactiveAt, setTriggerInactiveAt] = useState(0);
    const rafId = useRef<number | null>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false
    });
    
    const {
        setHeroAnimationProgress,
        setIsHeroFullWidth,
        setIsHeroSection,
        setIsHeroFullyScrolled,
    } = useHeroAnimation();

    // Accurate device and dimension detection
    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            setDimensions({
                width,
                height,
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024
            });
        };

        updateDimensions();
        
        // Add resize listener with debouncing
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateDimensions();
                // Refresh ScrollTrigger on resize to recalculate positions
                ScrollTrigger.refresh();
            }, 150);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    // Calculate responsive dimensions based on actual viewport
    const getResponsiveDimensions = () => {
        const { width, height, isMobile, isTablet } = dimensions;
        
        let initialHeight: number;
        let maxWidth = width;
        
        if (isMobile) {
            // Mobile: Much larger - 85-95% of viewport height, min 500px
            initialHeight = Math.max(height * 0.85, Math.min(500, height * 0.95));
        } else if (isTablet) {
            // Tablet: 75-85% of viewport height, min 600px
            initialHeight = Math.max(height * 0.75, Math.min(600, height * 0.85));
        } else {
            // Desktop: 70-80% of viewport height, min 650px
            initialHeight = Math.max(height * 0.7, Math.min(650, height * 0.8));
        }
        
        return {
            initialHeight: Math.round(initialHeight),
            maxWidth,
            maxHeight: height,
            padding: isMobile ? 12 : 16 // Reduced padding for more space
        };
    };

    useEffect(() => {
        const heroElement = heroRef.current;
        const containerElement = containerRef.current;

        if (!heroElement || !containerElement || dimensions.width === 0) return;

        const { initialHeight, maxWidth, maxHeight, padding } = getResponsiveDimensions();
        const { isMobile, isTablet } = dimensions;

        console.log('Hero dimensions calculated:', {
            device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
            viewport: { width: dimensions.width, height: dimensions.height },
            initialHeight,
            maxHeight,
            padding
        });

        // Kill existing animations to prevent conflicts
        if (animationRef.current) {
            animationRef.current.kill();
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Set initial styles with calculated dimensions - DEVICE-OPTIMIZED SIZING
        const initialStyles = {
            position: 'relative',
            width: maxWidth - (padding * 2),
            height: initialHeight,
            marginTop: isMobile ? 0 : 50, // RESTORED: 50px margin top for desktop like original
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: isMobile ? 16 : 32, // Slightly smaller radius for bigger feel
            // Critical for stability
            willChange: 'transform, width, height, border-radius',
            transform: 'translate3d(0, 0, 0)',
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            perspective: 1000,
        };

        // Apply initial styles immediately
        gsap.set(heroElement, initialStyles);
        gsap.set(containerElement, { padding });

        // Apply initial clip-path for desktop - OPTIMIZED FOR LARGER SIZE
        if (!isMobile) {
            gsap.set(heroElement, {
                clipPath: `polygon(0% 0%, 20% 1%, 50% 2%, 80% 1%, 100% 0%, 100% 100%, 80% 99%, 50% 98%, 20% 99%, 0% 100%)`,
            });
        }

        const updateHeroStates = (progress: number, scrollY: number, isScrollTriggerActive: boolean) => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            
            rafId.current = requestAnimationFrame(() => {
                const isAtTop = scrollY <= 10;
                
                // FINAL FIX: Hero is fully scrolled when we've scrolled significantly past the point
                // where ScrollTrigger became inactive (giving buffer for hero to completely exit)
                const bufferDistance = dimensions.height * 0.3; // 30% of viewport height as buffer
                const isFullyScrolled = triggerInactiveAt > 0 && 
                                       scrollY > (triggerInactiveAt + bufferDistance) && 
                                       progress >= 1.0 && 
                                       !isAtTop;
                
                const isFullWidth = progress > 0.3;
                const isInView = progress >= 0.6;
                
                setHeroAnimationProgress(progress);
                setIsHeroFullWidth(isFullWidth);
                setIsHeroSection(isInView && !isAtTop);
                setIsHeroFullyScrolled(isFullyScrolled);
                
                console.log('Hero state updated:', {
                    scrollY: scrollY.toFixed(1),
                    progress: progress.toFixed(3),
                    triggerInactiveAt,
                    bufferDistance: bufferDistance.toFixed(1),
                    requiredScrollY: triggerInactiveAt > 0 ? (triggerInactiveAt + bufferDistance).toFixed(1) : 'N/A',
                    isAtTop,
                    isInView: isInView,
                    isScrollTriggerActive,
                    isHeroSection: isInView && !isAtTop,
                    isHeroFullyScrolled: isFullyScrolled,
                    conditions: {
                        triggerWasInactive: triggerInactiveAt > 0,
                        scrolledPastBuffer: scrollY > (triggerInactiveAt + bufferDistance),
                        progressComplete: progress >= 1.0,
                        notAtTop: !isAtTop
                    }
                });
            });
        };
        

        // ULTRA-STABLE ANIMATION TIMELINE
        const timeline = gsap.timeline({
            paused: true,
            ease: "none", // Linear for ultra-stable movement
        });

        // Animate container padding - SMOOTH & STABLE
        timeline.to(containerElement, {
            padding: 0,
            duration: 1,
            ease: "power1.inOut", // Smoother easing
        }, 0);

        // Animate hero dimensions - RESTORED ORIGINAL MARGIN BEHAVIOR
        timeline.to(heroElement, {
            width: maxWidth,
            height: maxHeight,
            marginTop: 0, // Animates from 50px (desktop) or 0px (mobile) to 0px
            duration: 1,
            ease: "power1.inOut", // Consistent smooth easing
            // Force GPU acceleration for stability
            force3D: true,
            transformOrigin: "center center",
        }, 0);

        
        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: containerElement,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const scrollY = window.scrollY;
                const isScrollTriggerActive = self.isActive;
                
                // Update timeline progress smoothly
                timeline.progress(progress);
                
                // OPTIMIZED visual effects with larger initial size
                if (!isMobile && progress < 1) {
                    // Smooth clip-path animation - LESS AGGRESSIVE CLIPPING
                    const clipProgress = Math.min(progress, 0.8);
                    
                    const clipPath = clipProgress > 0.3
                        ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                        : `polygon(
                            0% 0%, 
                            ${Math.round(20 - clipProgress * 20)}% ${Math.round(1 - clipProgress * 1)}%, 
                            50% ${Math.round(2 - clipProgress * 2)}%, 
                            ${Math.round(80 + clipProgress * 20)}% ${Math.round(1 - clipProgress * 1)}%, 
                            100% 0%,
                            100% 100%, 
                            ${Math.round(80 + clipProgress * 20)}% ${Math.round(99 + clipProgress * 1)}%, 
                            50% ${Math.round(98 + clipProgress * 2)}%, 
                            ${Math.round(20 - clipProgress * 20)}% ${Math.round(99 + clipProgress * 1)}%, 
                            0% 100%
                        )`;
        
                    const borderRadius = clipProgress >= 0.8 ? 0 : Math.round(32 - clipProgress * 32);
        
                    // Apply with GPU acceleration
                    gsap.set(heroElement, {
                        clipPath,
                        borderRadius,
                        force3D: true,
                    });
                } else if (isMobile && progress < 1) {
                    // Mobile: smooth border radius only - OPTIMIZED RADIUS
                    const borderRadius = progress >= 0.8 ? 0 : Math.round(16 - progress * 16);
                    gsap.set(heroElement, { 
                        borderRadius,
                        force3D: true,
                    });
                }
                
                // Update states with accurate ScrollTrigger status
                updateHeroStates(progress, scrollY, isScrollTriggerActive);
            },
            onToggle: (self) => {
                const scrollY = window.scrollY;
                const isScrollTriggerActive = self.isActive;
                
                // CRITICAL: Track the exact scroll position when ScrollTrigger becomes inactive
                if (!isScrollTriggerActive && triggerInactiveAt === 0) {
                    setTriggerInactiveAt(scrollY);
                    console.log('ScrollTrigger became inactive at scroll position:', scrollY);
                } else if (isScrollTriggerActive) {
                    // Reset when ScrollTrigger becomes active again (scrolling back up)
                    setTriggerInactiveAt(0);
                }
                
                updateHeroStates(self.progress, scrollY, isScrollTriggerActive);
            },
            onRefresh: () => {
                // Reset trigger inactive position on refresh
                setTriggerInactiveAt(0);
                
                // Ensure stable positioning on refresh
                const scrollY = window.scrollY;
                if (scrollY <= 10) {
                    updateHeroStates(0, scrollY, false);
                }
            }
        });
        

        // Store timeline reference
        animationRef.current = timeline;

        // OPTIMIZED scroll detection with device-specific tolerance
        let ticking = false;
        const scrollTolerance = isMobile ? 20 : 15; // Slightly higher tolerance
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const isAtTop = scrollY <= scrollTolerance;
                    
                    if (isAtTop) {
                        // When at top, reset everything
                        setTriggerInactiveAt(0);
                        updateHeroStates(0, scrollY, false);
                    } else if (triggerInactiveAt > 0) {
                        // If ScrollTrigger was inactive, check if hero is fully scrolled
                        const bufferDistance = dimensions.height * 0.3;
                        if (scrollY > (triggerInactiveAt + bufferDistance)) {
                            // Update hero fully scrolled state
                            updateHeroStates(1.0, scrollY, false);
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initialize based on current scroll position
        const initialScrollY = window.scrollY;
        if (initialScrollY <= scrollTolerance) {
            updateHeroStates(0, initialScrollY, false);
        }

        // COMPREHENSIVE cleanup
        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            
            if (animationRef.current) {
                animationRef.current.kill();
            }
            
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            window.removeEventListener("scroll", handleScroll);
            
            // Reset states
            setHeroAnimationProgress(0);
            setIsHeroFullWidth(false);
            setIsHeroSection(false);
            setIsHeroFullyScrolled(false);
        };
    }, [
        dimensions,
        setHeroAnimationProgress,
        setIsHeroFullWidth,
        setIsHeroSection,
        setIsHeroFullyScrolled,
    ]);

    // Don't render until dimensions are calculated
    if (dimensions.width === 0) {
        return <div className="h-screen" />;
    }

    const { initialHeight, padding } = getResponsiveDimensions();
    const { isMobile, isTablet } = dimensions;

    return (
        <div ref={containerRef} className="h-screen" style={{ padding: `${padding}px` }}>
            <div
                ref={heroRef}
                className="hero-element relative overflow-hidden mx-auto"
                style={{
                    backgroundImage: `url(${content.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll", // Prevent parallax issues
                    height: `${initialHeight}px`,
                    width: `${dimensions.width - (padding * 2)}px`,
                    marginTop: isMobile ? "0px" : "50px", // RESTORED: Original 50px margin behavior
                    borderRadius: isMobile ? "16px" : "32px", // Updated border radius
                    // Ultra-stable CSS properties
                    willChange: "transform, width, height, border-radius",
                    transform: "translate3d(0, 0, 0)",
                    transformOrigin: "center center",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                    imageRendering: "auto",
                    // Prevent subpixel rendering issues
                    position: "relative",
                    contain: "layout style paint",
                }}
            >
                {/* Hero Content with Container for proper alignment */}
                <div className="absolute inset-0 flex items-end pb-4 md:pb-7">
                    <Container className="w-full">
                        <div className="text-white flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                            <h1
                                className={`${isLeft ? "block" : "hidden"
                                    } text-4xl md:text-7xl leading-tight md:leading-20 font-bodoni font-medium text-left ${content.fontClassName || ""
                                    }`}
                            >
                                {content.title.map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < content.title.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h1>

                            <div
                                className={`${isRight ? "flex" : "hidden"
                                    } flex-col items-start w-[90%] md:w-auto`}
                            >
                                <div className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl md:rounded-4xl p-4 pb-7 md:pl-6 md:pt-16 md:pb-10 md:pr-20 flex flex-col gap-3 md:gap-4 items-start w-full md:w-auto">
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
    );
};

export default Hero;