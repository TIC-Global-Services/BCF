'use client'
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from 'lucide-react';

const TeamCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const desktopScrollRef = useRef(null);
    const mobileScrollRef = useRef(null);

    // Sample team data - you can replace with your actual data
    const teamMembers = [
        {
            id: 1,
            name: "Jackson Fisher",
            role: "Full-Stack Developer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "UI/UX Designer",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Backend Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Emily Rodriguez",
            role: "Product Manager",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 5,
            name: "David Kim",
            role: "DevOps Engineer",
            image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face"
        },
        {
            id: 6,
            name: "Lisa Wang",
            role: "Frontend Developer",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
        }
    ];

    const scrollToCard = (index) => {
        const isMobile = window.innerWidth < 768;
        const scrollContainer = isMobile ? mobileScrollRef.current : desktopScrollRef.current;
        
        if (scrollContainer) {
            if (isMobile) {
                // Mobile: show one card at a time
                const containerWidth = scrollContainer.offsetWidth;
                const cardWidth = containerWidth;
                const scrollPosition = index * cardWidth;
                scrollContainer.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            } else {
                // Desktop: scroll one card width at a time
                const firstCard = scrollContainer.children[0];
                if (firstCard) {
                    const cardWidth = firstCard.offsetWidth;
                    const gap = 32; // gap-8 = 32px
                    const scrollDistance = cardWidth + gap;
                    const scrollPosition = index * scrollDistance;
                    
                    scrollContainer.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }
            setCurrentIndex(index);
        }
    };

    const handlePrevious = () => {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile logic
            const newIndex = currentIndex > 0 ? currentIndex - 1 : teamMembers.length - 1;
            scrollToCard(newIndex);
        } else {
            // Desktop logic - scroll through the infinite array
            const totalCards = teamMembers.length * 2; // We have duplicated the array
            const newIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
            scrollToCard(newIndex);
        }
    };

    const handleNext = () => {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile logic
            const newIndex = currentIndex < teamMembers.length - 1 ? currentIndex + 1 : 0;
            scrollToCard(newIndex);
        } else {
            // Desktop logic - scroll through the infinite array
            const totalCards = teamMembers.length * 2; // We have duplicated the array
            const newIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
            scrollToCard(newIndex);
        }
    };

    // Create infinite array by duplicating the team members (only for desktop)
    const infiniteTeamMembers = [...teamMembers, ...teamMembers];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Desktop Header */}
            <div className='hidden md:flex justify-between items-end mb-11'>
                <div className="">
                    <h2 className="text-5xl font-normal text-gray-900 mb-2">
                        The People Behind
                    </h2>
                    <h3 className="text-5xl font-normal text-gray-900">
                        Bhuma Cast Factory
                    </h3>
                </div>

                <div className="flex gap-2 z-10">
                    <button
                        onClick={handlePrevious}
                        className="bg-[#EBEBED] rounded-full p-3 transition-colors duration-200 hover:bg-gray-300"
                        aria-label="Previous team member"
                    >
                        <MoveLeft />
                    </button>

                    <button
                        onClick={handleNext}
                        className="bg-[#EBEBED] rounded-full p-3 transition-colors duration-200 hover:bg-gray-300"
                        aria-label="Next team member"
                    >
                        <MoveRight />
                    </button>
                </div>
            </div>

            {/* Mobile Header */}
            <div className='md:hidden text-center mb-8'>
                <h2 className="text-3xl font-normal text-gray-900 mb-1">
                    The People Behind
                </h2>
                <h3 className="text-3xl font-normal text-gray-900">
                    Bhuma Cast Factory
                </h3>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Desktop Cards Container - Show exactly 3 cards with infinite scroll */}
                <div
                    ref={desktopScrollRef}
                    className="hidden md:flex gap-8 overflow-x-auto scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollSnapType: 'x mandatory'
                    }}
                >
                    {infiniteTeamMembers.map((member, index) => (
                        <div
                            key={`${member.id}-${Math.floor(index / teamMembers.length)}`}
                            className="flex-shrink-0 bg-white rounded-2xl overflow-hidden"
                            style={{
                                width: 'calc(33.333% - 21px)',
                                scrollSnapAlign: 'start'
                            }}
                        >
                            <div className="aspect-[5/5] overflow-hidden p-3.5">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-normal text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-500 font-normal text-lg">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Cards Container - Show one card at a time */}
                <div className="md:hidden">
                    <div
                        ref={mobileScrollRef}
                        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.id}
                                className="flex-shrink-0 w-full snap-start"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden mx-4">
                                    <div className="aspect-[5/5] overflow-hidden p-4">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-normal text-gray-900 mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-gray-500 font-normal text-base">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Navigation Buttons */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            onClick={handlePrevious}
                            className="bg-[#EBEBED] rounded-full p-3 transition-colors duration-200 hover:bg-gray-300"
                            aria-label="Previous team member"
                        >
                            <MoveLeft size={20} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-[#EBEBED] rounded-full p-3 transition-colors duration-200 hover:bg-gray-300"
                            aria-label="Next team member"
                        >
                            <MoveRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default TeamCarousel;