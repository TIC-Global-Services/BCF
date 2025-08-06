"use client";
import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show/hide button based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Native smooth scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform ${isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
        >
            <button
                onClick={scrollToTop}
                className="
          group relative w-14 h-14 bg-black text-white rounded-full 
          shadow-lg hover:shadow-xl transition-all duration-300
          hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300
          backdrop-blur-sm border border-gray-800
          hover:scale-110 active:scale-95
        "
                aria-label="Scroll to top"
            >
                {/* Background pulse effect */}
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                {/* Arrow Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transform transition-transform duration-200 group-hover:-translate-y-1"
                    >
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </div>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 scale-0 group-active:opacity-20 group-active:scale-150 transition-all duration-200"></div>
                </div>
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Back to top
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
        </div>
    );
};

export default ScrollToTop;